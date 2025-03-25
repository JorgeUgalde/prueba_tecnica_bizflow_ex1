'use client';

import { useState, useEffect } from 'react';
import { getPosts, Post } from '../services/apiService';
import PostCart from '../components/PostCard';


export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar posts al iniciar
  useEffect(() => {
    fetchPosts();
  }, []);

  // Función para obtener todos los posts
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-100">
  

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Publicaciones</h1>
          
          
        </div>

        {/* Formulario para crear o editar */}
       

        {/* Lista de publicaciones */}
        <div>
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
