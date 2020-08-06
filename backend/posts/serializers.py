from posts.models import Post
from rest_framework import serializers


class PostSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    title = serializers.CharField(max_length=128)
    created_at = serializers.DateTimeField(read_only=True)
    announce_text = serializers.CharField(max_length=512)
    text = serializers.CharField(max_length=4096)
    image = serializers.ImageField()

    def create(self, validated_data):
        return Post.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.created_at = validated_data.get('created_at', instance.created_at)
        instance.announce_text = validated_data.get('announce_text', instance.announce_text)
        instance.text = validated_data.get('text', instance.text)
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance
