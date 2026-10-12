import csv

from django.contrib import admin
from django.http import HttpResponse

from .models import Application

admin.site.site_header = "BuildLab Applications"
admin.site.site_title = "BuildLab"
admin.site.index_title = "Internship applications"


@admin.action(description="Export selected applications as CSV")
def export_csv(modeladmin, request, queryset):
    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = 'attachment; filename="applications.csv"'
    response.write("\ufeff")  # lets Excel read the file correctly
    writer = csv.writer(response)
    writer.writerow(["Received", "Name", "Email", "Phone", "Track", "Status", "Message"])
    for a in queryset.order_by("created_at"):
        writer.writerow([a.created_at.strftime("%Y-%m-%d %H:%M"), a.name, a.email, a.phone,
                         a.track, a.get_status_display(), a.message])
    return response


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "track", "status", "created_at", "team_emailed", "confirmation_sent")
    list_editable = ("status",)  # change the status straight from the list
    list_filter = ("status", "track", "created_at")
    search_fields = ("name", "email", "phone", "message")
    readonly_fields = ("created_at", "team_emailed", "confirmation_sent")
    date_hierarchy = "created_at"
    ordering = ("-created_at",)
    actions = [export_csv]
