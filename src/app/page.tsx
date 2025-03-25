'use client';

import { useState, useEffect } from 'react';
import { getPosts, createPost, Post } from '../services/apiService';
import PostCart from '../components/PostCard';
import PostForm from '../components/PostForm';
import Notification from '../components/Notification';




export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmitForm = (post: Post) => {
    handleCreatePost(post);
  };

    const showNotification = (message: string, type: 'success' | 'error') => {
      setNotification({ message, type });
    };
  
    const closeNotification = () => {
      setNotification(null);
    };

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      showNotification('Error al cargar las publicaciones', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = async (post: Post) => {
    setIsLoading(true);
    try {
      const newPost = await createPost(post);
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setShowForm(false);
      showNotification('Publicación creada con éxito', 'success');
    } catch (error) {
      showNotification('Error al crear la publicación', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
  };

  


  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-100">

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}


      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Publicaciones</h1>


        </div>

        {/* Formulario para crear o editar */}
        <div>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Nueva Publicación
          </button>

          {(showForm) && (
            <div className="mb-6">
              <PostForm
                post={undefined}
                onSubmit={handleSubmitForm}
                onCancel={handleCancelForm}
                isLoading={isLoading}
              />
            </div>
          )}

        {/* Lista de publicaciones */}

          {isLoading && !posts.length ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
              <p>Cargando publicaciones...</p>
            </div>
          ) : posts.length ? (
            posts.map((post) => (
              <PostCart key={`post-${post.id}-${post.title}`} post={post} />
            ))
          ) : (
            <p className="text-center py-10 text-gray-500">No hay publicaciones disponibles.</p>
          )}
        </div>
      </div>
    </main>
  );
}
