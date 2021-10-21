from django.urls import path
from .views import *
app_name='test'
urlpatterns = [
    path('', testing_view,name='test'),
]