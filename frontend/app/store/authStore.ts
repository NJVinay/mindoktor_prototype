import { create } from 'zustand';

interface AuthState {
  token: string | null;
  role: 'DOCTOR' | 'PATIENT' | null;
  userId: string | null;
  name: string | null;
  isAuthenticated: boolean;
  login: (token: string, role: 'DOCTOR' | 'PATIENT', userId: string, name: string) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null,
  userId: null,
  name: null,
  isAuthenticated: false,
  login: (token, role, userId, name) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('auth', JSON.stringify({ token, role, userId, name }));
    }
    set({ token, role, userId, name, isAuthenticated: true });
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('auth');
    }
    set({ token: null, role: null, userId: null, name: null, isAuthenticated: false });
  },
  hydrate: () => {
    if (typeof window === 'undefined') return;
    const stored = sessionStorage.getItem('auth');
    if (stored) {
      try {
        const { token, role, userId, name } = JSON.parse(stored);
        set({ token, role, userId, name, isAuthenticated: true });
      } catch {
        sessionStorage.removeItem('auth');
      }
    }
  },
}));
