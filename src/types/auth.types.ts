export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'client' | 'admin';
    createdAt: string;
  }
  
  export interface AuthState {
    isAuthenticated: boolean;
    currentUser: User | null;
    loading: boolean;
    error: string | null;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
  }