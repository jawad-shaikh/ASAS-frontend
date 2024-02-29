import { Product } from '@/types';
import {create} from 'zustand';

interface User {
  userId: number;
  fullName: string;
  email: string;
  role: string;
  profilePicture?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
}

const useAuthStore = create<AuthState>((set) => {
  const storedToken = typeof window !== 'undefined' && localStorage.getItem('token');
  const storedUserData = typeof window !== 'undefined' && localStorage.getItem('userData');

  return {
    isAuthenticated: !!storedToken,
    user: storedUserData ? JSON.parse(storedUserData) : null,
    login: (token: string, userData: User) => {
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(userData));
      set({ isAuthenticated: true, user: userData });
    },
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      window.location.assign("http://localhost:3000");
      set({ isAuthenticated: false, user: null });
    },
    updateUser: (userData: User) => {
      set((state: any) => {
        // Get the previous user data from the state
        const prevUserData = state.user;
    
        // Merge the previous user data with the new userData
        const updatedUserData = { ...prevUserData };
    
        // Check if fullName is available in userData and update if available
        if (userData.fullName) {
          updatedUserData.fullName = userData.fullName;
        }
    
        // Check if profilePicture is available in userData and update if available
        if (userData.profilePicture) {
          updatedUserData.profilePicture = userData.profilePicture;
        }
    
        // Update localStorage with the updated userData
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
    
        // Update state with the updated userData
        return { ...state, user: updatedUserData };
      });
    },
    
  };
});

export default useAuthStore;

interface CartItem {
  activity: Product;
  bookingType: string;
  attendeeIds?: any[]; // Optional property for attendeeIds
  sessionDates?: string[]; // Optional property for sessionDates
}

interface CartState {
  items: CartItem[];
  addToCart: (
    activity: Product,
    bookingType: string,
    attendeeIds?: number[],
    sessionDates?: string[]
  ) => void;
  removeFromCart: (activityId: number) => void;
}

export const useCartStore = create<CartState>((set) => {
  // Load cart items from localStorage if available
  const storedItems =
    typeof window !== 'undefined' && localStorage.getItem('cartItems');
  const initialItems = storedItems ? JSON.parse(storedItems) : [];

  return {
    items: initialItems,
    addToCart: (activity, bookingType, attendeeIds = [], sessionDates = []) =>
      set((state) => {
        // Check if the activity already exists in the cart
        const existingIndex = state.items.findIndex(
          (item) => item.activity.id === activity.id
        );

        // If it exists, update the existing item
        if (existingIndex !== -1) {
          const updatedItems = [...state.items];
          updatedItems[existingIndex] = {
            activity,
            bookingType,
            attendeeIds,
            sessionDates,
          };
          localStorage.setItem('cartItems', JSON.stringify(updatedItems));
          return { items: updatedItems };
        }

        // If it doesn't exist, add a new item
        const newItems = [
          ...state.items,
          { activity, bookingType, attendeeIds, sessionDates },
        ];
        localStorage.setItem('cartItems', JSON.stringify(newItems));
        return { items: newItems };
      }),
    removeFromCart: (activityId) =>
      set((state) => {
        const updatedItems = state.items.filter(
          (item) => item.activity.id !== activityId
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        return { items: updatedItems };
      }),
  };
});


interface ModalState {
  signUpOpen: boolean;
  signInOpen: boolean;
  signOutOpen: boolean;
}

interface ModalActions {
  setSignUpOpen: (isOpen: boolean) => void;
  setSignInOpen: (isOpen: boolean) => void;
  setSignOutOpen: (isOpen: boolean) => void;
}

export const useModalStore = create<ModalState & ModalActions>((set) => ({
  signUpOpen: false,
  signInOpen: false,
  signOutOpen: false,
  setSignUpOpen: (isOpen) => set({ signUpOpen: isOpen }),
  setSignInOpen: (isOpen) => set({ signInOpen: isOpen }),
  setSignOutOpen: (isOpen) => set({ signOutOpen: isOpen }),
}));

