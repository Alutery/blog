from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Post
from .serializers import PostSerializer


class PostsView(APIView):
    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response({'posts': serializer.data})

    def post(self, request):
        post = request.data
        serializer = PostSerializer(data=post)

        if serializer.is_valid(raise_exception=True):
            post_saved = serializer.save()

            return Response({'success": "Post "{}" created successfully'.format(post_saved.title)})


class PostView(APIView):
    def get(self, request, pk):
        saved_post = get_object_or_404(Post.objects.all(), pk=pk)
        serializer = PostSerializer(instance=saved_post)

        return Response({'post': serializer.data})
