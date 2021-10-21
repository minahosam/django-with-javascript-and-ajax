from django.contrib import admin
from .models import Profile
# Register your models here.
class  ProfileAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': 'user.username'}
admin.site.register(Profile)