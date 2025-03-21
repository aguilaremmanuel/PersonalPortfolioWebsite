from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.landing_page, name='landing_page'),
    path('inquire-now/', views.inquire_page, name='inquire_page'),
] 
