from django.urls import include, re_path
from SupplyChainApp import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    re_path(r'^register$', views.registerApi),
    re_path(r'^register/([0-9]+)$', views.registerApi),

    re_path(r'^input$', views.inputApi),
    re_path(r'^input/([0-9]+)$', views.inputApi),

    re_path(r'^output$', views.outputApi),
    re_path(r'^output/([0-9]+)$', views.outputApi),

]+static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)