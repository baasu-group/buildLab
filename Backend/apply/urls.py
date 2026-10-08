from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("api/apply/", views.submit, name="submit"),
]
urlpatterns += [path("api/apply-public/", views.submit_api, name="submit_api")]
