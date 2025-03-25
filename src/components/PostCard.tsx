import React from 'react';
import { Post } from '../services/apiService';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 transition-all hover:shadow-lg">
      <h2 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h2>
      <p className="text-gray-600 mb-4">{post.body}</p>
      <div className="flex justify-end">
      </div>
    </div>
  );
};

export default PostCard; 