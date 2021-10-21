from django.contrib import admin
from .models import Post,Photo
# Register your models here.
class photoTabular(admin.StackedInline):
    model = Photo
class addPhotos(admin.ModelAdmin):
    inlines = [photoTabular,]
admin.site.register(Post,addPhotos)