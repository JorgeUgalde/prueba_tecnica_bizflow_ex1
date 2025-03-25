const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface Post {
    id?: number;
    title: string;
    body: string;
    userId?: number;
  }

  // handle error
const handleApiError = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.message || `Error: ${response.status} - ${response.statusText}`;
    throw new Error(errorMessage);
  }
  return response;
};

// get all posts
export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);
    await handleApiError(response);
    return response.json();
  } catch (error) {
    console.error('Error al obtener posts:', error);
    throw error;
  }
};

// create a new post
export const createPost = async (post: Post): Promise<Post> => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...post,
          userId: 1, // Asigné todos los posts al userId 1
        }),
      });
      await handleApiError(response);
      return response.json();
    } catch (error) {
      console.error('Error al crear post:', error);
      throw error;
    }
  };
