import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import { requestAccess } from "@stellar/freighter-api";
import { User } from '../types/auth';

// Define the shape of the authentication state
interface AuthState {
  isAuthenticated: boolean;
  isWalletConnected: boolean;
  user: User | null;
  walletPublicKey: string | null;
  loading: boolean;
  error: string | null;
}

interface LoginCredentials {
  email: string;
  password: string;
}

// Define the actions that can be dispatched
type AuthAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAILURE'; payload: string }
  | { type: 'WALLET_CONNECT_START' }
  | { type: 'WALLET_CONNECT_SUCCESS'; payload: string }
  | { type: 'WALLET_CONNECT_FAILURE'; payload: string }
  | { type: 'WALLET_DISCONNECT' };

// Initial state for the authentication context
const initialState: AuthState = {
  isAuthenticated: false,
  isWalletConnected: false,
  user: null,
  walletPublicKey: null,
  loading: false,
  error: null,
};

// Create the authentication context
const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (pass: string) => Promise<void>;
  logout: () => void;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}>({ 
  state: initialState,
  dispatch: () => null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  connectWallet: async () => {},
  disconnectWallet: () => {},
});

// Reducer function to handle state changes based on actions
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  console.log('AuthReducer Action:', action.type, 'Payload:', 'payload' in action ? action.payload : 'No payload');
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        loading: false,
        error: null,
      };
    case 'REGISTER_SUCCESS':
        localStorage.setItem('user', JSON.stringify(action.payload));
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload,
            loading: false,
            error: null,
        };
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('user');
      localStorage.removeItem('walletPublicKey');
      return { ...initialState };

    case 'WALLET_CONNECT_START':
      return { ...state, loading: true, error: null };
    case 'WALLET_CONNECT_SUCCESS':
      console.log('Reducer: Wallet connect success, public key:', action.payload);
      localStorage.setItem('walletPublicKey', action.payload);
      return { 
        ...state, 
        isAuthenticated: true,
        isWalletConnected: true, 
        walletPublicKey: action.payload, 
        loading: false, 
        error: null 
      };
    case 'WALLET_CONNECT_FAILURE':
      return { ...state, isWalletConnected: false, error: action.payload, loading: false };
    case 'WALLET_DISCONNECT':
      localStorage.removeItem('walletPublicKey');
      return { ...state, isWalletConnected: false, walletPublicKey: null };
    default:
      return state;
  }
};

// Provider component to wrap the application and provide auth context
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const walletPublicKey = localStorage.getItem('walletPublicKey');

    if (user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: JSON.parse(user) } });
    } 
    if (walletPublicKey) {
      dispatch({ type: 'WALLET_CONNECT_SUCCESS', payload: walletPublicKey });
    }
  }, []);

  const connectWallet = async () => {
    dispatch({ type: 'WALLET_CONNECT_START' });
    try {
      const publicKey = await requestAccess();
      if (publicKey) {
        // @ts-ignore
        dispatch({ type: 'WALLET_CONNECT_SUCCESS', payload: publicKey.address || publicKey });
      } else {
        throw new Error('Freighter wallet is not connected or installed.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch({ type: 'WALLET_CONNECT_FAILURE', payload: `Falha ao conectar a carteira Freighter: ${errorMessage}` });
      console.error(error);
    }
  };

  const disconnectWallet = () => {
    dispatch({ type: 'WALLET_DISCONNECT' });
  };

  // Mock login function
  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' });
    // Simulate API call
    setTimeout(() => {
      if (credentials.email === 'fundacao@educhain.org' && credentials.password === 'demo123') {
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user: { id: '1', name: 'Foundation Manager', role: 'foundation_manager' } } });
      } else if (credentials.email === 'escola@educhain.org' && credentials.password === 'demo123') {
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user: { id: '2', name: 'School Manager', role: 'school_manager' } } });
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials' });
      }
    }, 1000);
  };

  const register = async (pass: string) => {
    console.log(pass)
    dispatch({ type: 'REGISTER_START' });
    // Simulate API call
    setTimeout(() => {
      const newUser = { id: '3', name: 'New User', role: 'school_manager' };
      dispatch({ type: 'REGISTER_SUCCESS', payload: newUser });
    }, 1000);
  };

  // Logout function
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, login, register, logout, connectWallet, disconnectWallet }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);