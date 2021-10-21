from django.shortcuts import render
from .models import *
from django.http import JsonResponse,HttpResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from .forms import *
# Create your views here.
@csrf_exempt
def all_posts(request):
    qs=Post.objects.all()
    if request.method=='POST':
        form = postForm(request.POST,request.FILES)
        if request.is_ajax():
            if form.is_valid():
                author = Profile.objects.get(user=request.user)
                instance = form.save(commit=False)
                instance.author = author
                instance.save()
                return JsonResponse({'title':instance.title,'body':instance.body,'author':instance.author.user.username,'id':instance.id,'count':instance.liked_count})
    else:
        form = postForm()
    return render(request,'main/all_posts.html',{'qs':qs,'form':form})
def post_json(request):
    return JsonResponse({'data':'works'})
def get_posts_with_json(request,num_posts):
    if request.is_ajax():
        visible = 2
        upper = num_posts
        lower = upper - visible
        size = Post.objects.all().count()
        qs=Post.objects.all()
        # data=serializers.serialize('json',qs)
        data=[]
        for obj in qs:
            item={
                'id':obj.pk,
                'title':obj.title,
                'body':obj.body,
                'like':True if request.user in obj.liked_post.all() else False,
                'count':obj.liked_count,
            }
            data.append(item)
        return JsonResponse({'data':data[lower:upper],'size':size})
def post_detail(request,pk):
    requested_post=Post.objects.get(pk=pk)
    if request.method=='POST':
        form = postForm()
    else:
        form = postForm()
    return render(request,'main/post_detail.html',{'post':requested_post,'form':form})
def post_detail_data(request,pk):
    obj=Post.objects.get(pk=pk)
    user=Profile.objects.get(user=request.user)
    data={
        'id':obj.id,
        'title':obj.title,
        'body':obj.body,
        'author':obj.author.user.username,
        'logged_in':request.user.username,
    }
    return JsonResponse({'data':data})
@csrf_exempt
def like_unlike_json(request):
    if request.is_ajax():
        pk=request.POST.get('pk')
        obj=Post.objects.get(pk=pk)
        if request.user in obj.liked_post.all():
            liked = False
            obj.liked_post.remove(request.user)
        else:
            liked = True
            obj.liked_post.add(request.user)
        return JsonResponse({'liked':liked , 'count':obj.liked_count})
def update_post(request,pk):
    single_post=Post.objects.get(pk=pk)
    if request.is_ajax():
        title=request.POST.get('title')
        body=request.POST.get('body')
        single_post.title=title
        single_post.body=body
        single_post.save()
        return JsonResponse({
            'title':title,
            'body':body
        })
def delete_post(request,pk):
    single_post=Post.objects.get(pk=pk)
    if request.is_ajax():
        single_post.delete()
        return JsonResponse({'deleted':'deleted'})
def save_pic(request):
    # to print the pics
    # print(request.FILES)
    if (request.method =='POST'):
        img=request.FILES.get('file')
        post_id=request.POST.get('new_post_id')
        print(post_id)
        post=Post.objects.get(id=post_id)
        Photo.objects.create(photos=img,photo_post=post)
    return HttpResponse()