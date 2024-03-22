import { Product } from "@/types";
import { create } from "zustand";

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
  const storedToken =
    typeof window !== "undefined" && localStorage.getItem("token");
  const storedUserData =
    typeof window !== "undefined" && localStorage.getItem("userData");

  return {
    isAuthenticated: !!storedToken,
    user: storedUserData ? JSON.parse(storedUserData) : null,
    login: (token: string, userData: User) => {
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userData));
      set({ isAuthenticated: true, user: userData });
    },
    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      window.location.assign("https://asas.mchd-manager.com");
      set({ isAuthenticated: false, user: null });
    },
    updateUser: (userData: User) => {
      localStorage.setItem("userData", JSON.stringify(userData));
      set((state) => ({ ...state, user: userData }));
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
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => {
  // Load cart items from localStorage if available
  const storedItems =
    typeof window !== "undefined" && localStorage.getItem("cartItems");
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
          localStorage.setItem("cartItems", JSON.stringify(updatedItems));
          return { items: updatedItems };
        }

        // If it doesn't exist, add a new item
        const newItems = [
          ...state.items,
          { activity, bookingType, attendeeIds, sessionDates },
        ];
        localStorage.setItem("cartItems", JSON.stringify(newItems));
        return { items: newItems };
      }),
    removeFromCart: (activityId) =>
      set((state) => {
        const updatedItems = state.items.filter(
          (item) => item.activity.id !== activityId
        );
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        return { items: updatedItems };
      }),
    clearCart: () => {
      set({ items: [] });
    },
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
