import api from './axios';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  name: string;
  role: 'encontrista' | 'admin';
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  userRole?: string;
  username?: string;
  message?: string;
}

const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/login', credentials);
      
      if (response.data.success && response.data.token) {
        // Save auth data in session storage
        sessionStorage.setItem('authToken', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: 'Falha na autenticação. Verifique suas credenciais.'
      };
    }
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      return { 
        success: false, 
        message: 'Falha ao criar usuário. Tente novamente.'
      };
    }
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
      // Clear auth data
      sessionStorage.removeItem('authToken');
    } catch (error) {
      console.error('Logout error:', error);
      // Still remove token even if API call fails
      sessionStorage.removeItem('authToken');
    }
  },

  getCurrentUser: async (): Promise<AuthResponse> => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      return { 
        success: false, 
        message: 'Não foi possível obter os dados do usuário.'
      };
    }
  }
};

export default authService;