import json

from django.core import mail
from django.test import TestCase, override_settings

from .models import Application

GOOD = {
    "name": "Test User",
    "email": "test@example.com",
    "phone": "123",
    "track": "QA Engineer",
    "message": "I want to learn.\nSecond line.",
}


@override_settings(MAIL_TO="team@example.com", DEFAULT_FROM_EMAIL="from@example.com", EMAIL_ENABLED=True)
class ApplyApiTests(TestCase):
    URL = "/api/apply-public/"
    ORIGIN = "http://localhost:8000"

    def post(self, data, origin=None):
        return self.client.post(
            self.URL, json.dumps(data), content_type="text/plain;charset=utf-8",
            HTTP_ORIGIN=origin or self.ORIGIN,
        )

    def test_valid_application_is_saved_and_two_emails_sent(self):
        response = self.post(GOOD)
        self.assertEqual(response.json(), {"ok": True})
        self.assertEqual(Application.objects.count(), 1)
        saved = Application.objects.get()
        self.assertTrue(saved.team_emailed)
        self.assertTrue(saved.confirmation_sent)
        self.assertEqual(len(mail.outbox), 2)
        self.assertEqual(mail.outbox[0].to, ["team@example.com"])
        self.assertEqual(mail.outbox[0].reply_to, ["test@example.com"])
        self.assertEqual(mail.outbox[1].to, ["test@example.com"])

    def test_html_in_message_is_escaped_in_email(self):
        self.post({**GOOD, "message": "<script>alert(1)</script>"})
        html = mail.outbox[0].alternatives[0][0]
        self.assertNotIn("<script>alert(1)</script>", html)
        self.assertIn("&lt;script&gt;", html)

    def test_bad_email_is_rejected(self):
        response = self.post({**GOOD, "email": "nope"})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(Application.objects.count(), 0)

    def test_unknown_track_is_rejected(self):
        self.assertEqual(self.post({**GOOD, "track": "Pirate"}).status_code, 400)

    def test_honeypot_saves_nothing(self):
        self.post({**GOOD, "website": "http://spam"})
        self.assertEqual(Application.objects.count(), 0)
        self.assertEqual(len(mail.outbox), 0)

    def test_other_origin_is_blocked(self):
        response = self.post(GOOD, origin="https://evil.example")
        self.assertEqual(response.status_code, 403)
        self.assertEqual(Application.objects.count(), 0)

    def test_check_address_works(self):
        response = self.client.get(self.URL)
        self.assertTrue(response.json()["ok"])


@override_settings(EMAIL_ENABLED=False)
class SaveOnlyTests(TestCase):
    def test_saved_without_sending_any_email(self):
        response = self.client.post(
            "/api/apply-public/", json.dumps(GOOD), content_type="text/plain",
            HTTP_ORIGIN="http://localhost:8000",
        )
        self.assertEqual(response.json(), {"ok": True})
        self.assertEqual(Application.objects.count(), 1)
        self.assertEqual(len(mail.outbox), 0)
        self.assertFalse(Application.objects.get().team_emailed)
