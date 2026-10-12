"""Builds and sends the two emails: one to the team, one to the applicant."""
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils import timezone


def send_team_email(application):
    received = timezone.localtime(application.created_at).strftime("%d %b %Y, %H:%M")
    context = {"app": application, "received": received}

    text = (
        f"New application\n\n"
        f"Name: {application.name}\nEmail: {application.email}\n"
        f"Phone: {application.phone or 'Not provided'}\nTrack: {application.track}\n"
        f"Received: {received}\n\nMessage:\n{application.message}"
    )
    mail = EmailMultiAlternatives(
        subject=f"New application: {application.name} ({application.track})",
        body=text,  # plain-text fallback
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[settings.MAIL_TO],
        reply_to=[application.email],  # pressing Reply goes to the applicant
    )
    mail.attach_alternative(render_to_string("apply/emails/team.html", context), "text/html")
    mail.send(fail_silently=False)


def send_confirmation_email(application):
    text = (
        f"Hi {application.name},\n\n"
        f"Thanks for applying to the BuildLab Internship ({application.track} track). "
        f"We have received your application and will get back to you soon.\n\n- BuildLab Team"
    )
    mail = EmailMultiAlternatives(
        subject="We received your BuildLab application",
        body=text,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[application.email],
        reply_to=[settings.MAIL_TO],
    )
    mail.attach_alternative(
        render_to_string("apply/emails/confirmation.html", {"app": application}), "text/html"
    )
    mail.send(fail_silently=False)
