import React from 'react';
import { Post } from '../services/apiService';

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onEdit }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 transition-all hover:shadow-lg">
      <h2 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h2>
      <p className="text-gray-600 mb-4">{post.body}</p>
      <div className="flex justify-end">
      <button
          onClick={() => onEdit(post)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Editar
        </button>
     
      </div>
    </div>
  );
};

export default PostCard; 