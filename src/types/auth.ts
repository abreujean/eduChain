export interface User {
  id: string;
  name: string;
  email: string;
  role: 'foundation_manager' | 'school_manager';
  walletAddress?: string;
  schoolId?: string;
  permissions: string[];
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'foundation_manager' | 'school_manager';
  schoolId?: string;
}