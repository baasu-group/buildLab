import json
import logging

from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_POST

from .emails import send_confirmation_email, send_team_email
from .models import Application

logger = logging.getLogger(__name__)

TRACKS = ["UI/UX Designer", "Frontend Developer", "Backend Developer", "QA Engineer"]


def clean(value, limit):
    """Short fields: remove line breaks (also blocks email header injection)."""
    return " ".join(str(value or "").split())[:limit]


def index(request):
    return render(request, "apply/index.html", {"tracks": TRACKS})


@require_POST
def submit(request):
    # 1) Read the JSON the browser sent
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"ok": False, "error": "Bad request."}, status=400)

    # Spam trap: bots fill the hidden "website" field, people never see it
    if data.get("website"):
        return JsonResponse({"ok": True})

    # 2) Clean and validate
    name = clean(data.get("name"), 100)
    email = clean(data.get("email"), 120)
    phone = clean(data.get("phone"), 30)
    track = clean(data.get("track"), 40)
    message = str(data.get("message") or "").strip()[:2000]

    if not name or not message:
        return JsonResponse({"ok": False, "error": "Please fill all required fields."}, status=400)
    if track not in TRACKS:
        return JsonResponse({"ok": False, "error": "Please choose a valid track."}, status=400)
    try:
        validate_email(email)
    except ValidationError:
        return JsonResponse({"ok": False, "error": "Invalid email address."}, status=400)

    # 3) Save the application first, so it is never lost even if email fails
    application = Application.objects.create(
        name=name, email=email, phone=phone, track=track, message=message
    )

    # 4) Optionally send emails (off by default, see EMAIL_ENABLED in settings.py).
    #    A failure is logged and flagged in the admin, but the application is already saved.
    if settings.EMAIL_ENABLED:
        try:
            send_team_email(application)
            Application.objects.filter(pk=application.pk).update(team_emailed=True)
        except Exception:
            logger.exception("Team email failed for application %s", application.pk)

        try:
            send_confirmation_email(application)
            Application.objects.filter(pk=application.pk).update(confirmation_sent=True)
        except Exception:
            logger.exception("Confirmation email failed for application %s", application.pk)

    return JsonResponse({"ok": True})


# ===== API for the static BuildLab site (different address, so CORS is needed) =====
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt


def add_cors(request, response):
    """Tell the browser this origin is allowed to read the reply."""
    origin = request.headers.get("Origin", "")
    if origin in settings.ALLOWED_ORIGINS:
        response["Access-Control-Allow-Origin"] = origin
        response["Vary"] = "Origin"
    return response


@csrf_exempt  # the static site cannot get Django's CSRF token, so we rely on the origin check + spam trap
def submit_api(request):
    if request.method == "OPTIONS":  # browser's permission check, only sent for some requests
        response = HttpResponse(status=204)
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return add_cors(request, response)

    if request.method == "GET":  # open this address in a browser to check the API is running
        return add_cors(request, JsonResponse({"ok": True, "status": "apply API v2 is running"}))

    if request.method != "POST":
        return add_cors(request, JsonResponse({"ok": False, "error": "POST only."}, status=405))

    origin = request.headers.get("Origin", "")
    if origin and origin not in settings.ALLOWED_ORIGINS:
        return JsonResponse({"ok": False, "error": "Origin not allowed."}, status=403)

    return add_cors(request, submit(request))  # reuse the same validate + send logic
