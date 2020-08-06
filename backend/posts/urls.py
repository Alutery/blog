from django.urls import path
from . import views

urlpatterns = [
    path('posts', views.PostsView.as_view()),
    path('post/<int:pk>', views.PostView.as_view()),
]
