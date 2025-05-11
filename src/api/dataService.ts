import api from './axios';

export interface UserData {
  id?: string;
  username: string;
  name: string;
  role: 'encontrista' | 'admin';
}

export interface MediaData {
  id?: string;
  title: string;
  familyMember: string;
  type: 'video' | 'photo';
  url?: string;
  thumbnailUrl?: string;
  userId: string;
}

const dataService = {
  // User operations
  getUsers: async (): Promise<UserData[]> => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  },

  getUserByUsername: async (username: string): Promise<UserData> => {
    try {
      const response = await api.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch user ${username}:`, error);
      throw error;
    }
  },

  createUser: async (userData: UserData): Promise<UserData> => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  },

  updateUser: async (username: string, userData: Partial<UserData>): Promise<UserData> => {
    try {
      const response = await api.put(`/users/${username}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update user ${username}:`, error);
      throw error;
    }
  },

  deleteUser: async (username: string): Promise<void> => {
    try {
      await api.delete(`/users/${username}`);
    } catch (error) {
      console.error(`Failed to delete user ${username}:`, error);
      throw error;
    }
  },

  // Media operations (videos/photos)
  getMediaByUser: async (username: string): Promise<MediaData[]> => {
    try {
      const response = await api.get(`/media/user/${username}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch media for user ${username}:`, error);
      throw error;
    }
  },

  getMediaById: async (id: string): Promise<MediaData> => {
    try {
      const response = await api.get(`/media/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch media ${id}:`, error);
      throw error;
    }
  },

  uploadMedia: async (mediaData: FormData): Promise<MediaData> => {
    try {
      const response = await api.post('/media/upload', mediaData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to upload media:', error);
      throw error;
    }
  },

  createMediaLink: async (mediaData: Omit<MediaData, 'id' | 'url' | 'thumbnailUrl'>): Promise<MediaData> => {
    try {
      const response = await api.post('/media/link', mediaData);
      return response.data;
    } catch (error) {
      console.error('Failed to create media link:', error);
      throw error;
    }
  },

  deleteMedia: async (id: string): Promise<void> => {
    try {
      await api.delete(`/media/${id}`);
    } catch (error) {
      console.error(`Failed to delete media ${id}:`, error);
      throw error;
    }
  }
};

export default dataService;