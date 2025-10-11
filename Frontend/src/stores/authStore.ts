import { create } from 'zustand'

interface AuthStore {
  // user: User | null;
  // isAuthenticated: boolean;
  // setUser: (user: User | null) => void;
  isLoginModalOpen: boolean
  openLoginModal: () => void
  closeLoginModal: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  // user: null,
  // isAuthenticated: false,
  // setUser: (user) => set({ user, isAuthenticated: (user !== null), }),
  isLoginModalOpen: false,
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
}));