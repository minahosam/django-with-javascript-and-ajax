from django.shortcuts import render

# Create your views here.
def testing_view(request):
    return render(request, 'index/test.html', {})