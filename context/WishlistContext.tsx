'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product } from '@/types';

interface WishlistState {
  items: Product[];
  isLoaded: boolean;
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: { productId: number } }
  | { type: 'LOAD_WISHLIST'; payload: Product[] };

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  isLoaded: boolean;
}

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (exists) return state;
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.productId),
      };
    case 'LOAD_WISHLIST':
      return { ...state, items: action.payload, isLoaded: true };
    default:
      return state;
  }
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [], isLoaded: false });

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('luxe-wishlist');
      if (savedWishlist) {
        const parsed = JSON.parse(savedWishlist);
        dispatch({ type: 'LOAD_WISHLIST', payload: parsed });
      } else {
        dispatch({ type: 'LOAD_WISHLIST', payload: [] });
      }
    } catch {
      dispatch({ type: 'LOAD_WISHLIST', payload: [] });
    }
  }, []);

  // Save wishlist to localStorage on changes
  useEffect(() => {
    if (state.isLoaded) {
      localStorage.setItem('luxe-wishlist', JSON.stringify(state.items));
    }
  }, [state.items, state.isLoaded]);

  const addToWishlist = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeFromWishlist = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  const toggleWishlist = (product: Product) => {
    if (state.items.some((item) => item.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId: number) => {
    return state.items.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        items: state.items,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        isLoaded: state.isLoaded,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
