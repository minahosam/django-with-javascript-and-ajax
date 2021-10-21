from django.urls import path
from post.views import *
from .models import *
app_name='post'
urlpatterns = [
    path('', all_posts,name='all'),
    path('json/', post_json,name='json'),
    path('jpost/<int:num_posts>/',get_posts_with_json,name='json-post'),
    path('jpost/like-unlike/', like_unlike_json,name='liked'),
    path('<pk>/',post_detail,name='detail'),
    path('<pk>/data/',post_detail_data,name='data'),
    path('<pk>/update/',update_post,name='update'),
    path('<pk>/delete/',delete_post,name='delete'),
    path('upload/',save_pic,name='pic'),
]
