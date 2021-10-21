from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext as _
# Create your models here.
class Profile(models.Model):
    user=models.OneToOneField(User, related_name='owned_user', on_delete=models.CASCADE,unique=True)
    bio=models.CharField(max_length=100,default='no bio')
    user_pic=models.ImageField( upload_to='media/',default='person.png', height_field=None, width_field=None, max_length=None)
    updated=models.DateTimeField(auto_now=True)
    created=models.DateTimeField(auto_now_add=True)
    slug=models.SlugField(default='user')
    def __str__(self):
        return str(self.user.username)
    def save(self, *args, **kwargs):
        self.slug=self.user
        super(Profile, self).save(*args, **kwargs) # Call the real save() method

    class Meta:
        ordering=['-created']