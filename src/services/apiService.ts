const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface Post {
    id?: number;
    title: string;
    body: string;
    userId?: number;
  }

const handleApiError = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.message || `Error: ${response.status} - ${response.statusText}`;
    throw new Error(errorMessage);
  }
  return response;
};

// Servicio para obtener todas las publicaciones
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
