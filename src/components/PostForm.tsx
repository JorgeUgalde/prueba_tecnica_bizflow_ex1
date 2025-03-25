import React, { useState, useEffect } from 'react';
import { Post } from '../services/apiService';

interface PostFormProps {
  post?: Post;
  onSubmit: (post: Post) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const PostForm: React.FC<PostFormProps> = ({
  post,
  onSubmit,
  onCancel,
  isLoading
}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({ title: '', body: '' });

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const validateForm = (): boolean => {
    const newErrors = { title: '', body: '' };
    let isValid = true;

    if (!title.trim()) {
      newErrors.title = 'El título es obligatorio';
      isValid = false;
    }

    if (!body.trim()) {
      newErrors.body = 'El contenido es obligatorio';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const formData: Post = {
        title: title.trim(),
        body: body.trim(),
      };            
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        'Crear Nueva Publicación'
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Título
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ingresa el título"
            disabled={isLoading}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="body" className="block text-gray-700 text-sm font-bold mb-2">
            Contenido
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className={`text-black  w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.body ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ingresa el contenido"
            rows={5}
            disabled={isLoading}
          ></textarea>
          {errors.body && <p className="text-red-500 text-xs mt-1">{errors.body}</p>}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Guardando...' : post ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm; 