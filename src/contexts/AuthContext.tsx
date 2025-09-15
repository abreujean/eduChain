import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterData } from '@/types/auth';

interface AuthContextType {
  state: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAIL'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CONNECT_WALLET'; payload: string }
  | { type: 'DISCONNECT_WALLET' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case 'LOGIN_FAIL':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    case 'CONNECT_WALLET':
      return {
        ...state,
        user: state.user ? { ...state.user, walletAddress: action.payload } : null,
      };
    case 'DISCONNECT_WALLET':
      return {
        ...state,
        user: state.user ? { ...state.user, walletAddress: undefined } : null,
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Mock authentication - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on email
      const mockUser: User = {
        id: '1',
        name: credentials.email === 'fundacao@educhain.org' ? 'Ana Silva' : 'Carlos Santos',
        email: credentials.email,
        role: credentials.email === 'fundacao@educhain.org' ? 'foundation_manager' : 'school_manager',
        permissions: credentials.email === 'fundacao@educhain.org' 
          ? ['manage_schools', 'approve_distributions', 'view_analytics'] 
          : ['manage_school', 'submit_metrics', 'view_distributions'],
        schoolId: credentials.email !== 'fundacao@educhain.org' ? 'school-1' : undefined,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.email}`,
      };
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAIL', payload: 'Credenciais inválidas' });
    }
  };

  const register = async (data: RegisterData) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Mock registration - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        role: data.role,
        permissions: data.role === 'foundation_manager' 
          ? ['manage_schools', 'approve_distributions', 'view_analytics'] 
          : ['manage_school', 'submit_metrics', 'view_distributions'],
        schoolId: data.schoolId,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
      };
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAIL', payload: 'Erro ao criar conta' });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const connectWallet = async () => {
    try {
      // Mock wallet connection - replace with actual Stellar/Freighter integration
      const mockAddress = 'GDRXE2BQUC3AZNPVFSCEZ76NJ3WWL25FYFK6RGZGIEKWE4SOOHSUJUJ6';
      dispatch({ type: 'CONNECT_WALLET', payload: mockAddress });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnectWallet = () => {
    dispatch({ type: 'DISCONNECT_WALLET' });
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout, connectWallet, disconnectWallet }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}