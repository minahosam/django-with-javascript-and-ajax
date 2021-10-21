from django.db import models
from django.utils.translation import ugettext as _
from django.contrib.auth.models import User
from profiles.models import *
# Create your models here.
class Post(models.Model):
    title=models.CharField( max_length=100)
    body = models.TextField(max_length=5000)
    author=models.ForeignKey(Profile,to_field='user', related_name='user_author', on_delete=models.CASCADE)
    liked_post=models.ManyToManyField(User,related_name='like',blank=True)
    updated=models.DateTimeField(auto_now=True)
    created=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return str(self.pk)
    @property
    def liked_count(self):
        return self.liked_post.all().count()
    def get_photos_post(self):
        return self.photo.all()
class Photo(models.Model):
    photo_post=models.ForeignKey(Post, related_name='photo', on_delete=models.CASCADE)
    photos=models.ImageField( upload_to='photo/',default=None)
    created=models.DateTimeField(auto_now_add=True)