from django.db import models


class Application(models.Model):
    STATUS_CHOICES = [
        ("new", "New"),
        ("reviewing", "Reviewing"),
        ("interview", "Interview"),
        ("accepted", "Accepted"),
        ("rejected", "Rejected"),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=120)
    phone = models.CharField(max_length=30, blank=True)
    track = models.CharField(max_length=40)
    message = models.TextField(max_length=2000)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")
    created_at = models.DateTimeField(auto_now_add=True)

    # Did the emails go out? (helps you spot SMTP problems in the admin)
    team_emailed = models.BooleanField(default=False)
    confirmation_sent = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} ({self.track})"
