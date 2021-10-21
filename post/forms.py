from django import forms
from .models import *
class postForm(forms.ModelForm):
    title = forms.CharField(widget=forms.TextInput(attrs={'class':'form-control','placeholder':'write title ....'}))
    body = forms.CharField(widget=forms.Textarea(attrs={'class':'form-control','rows':3,'placeholder':'write body.....'}))
    class Meta:
        model = Post
        fields =['title','body']