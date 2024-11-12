import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ICartItem } from '../interface';

interface RestaurantStore {
  tableNumber: number;
  roomId: number;
  roomName: string | null,
  paymentMethodId: number,
  amount: number,
  cart: ICartItem[];
  setTableNumber: (number: number) => void;
  setRoomId: (number: number) => void;
  setRoom: (value: string | null) => void;
  setPaymentMethodId: (number: number) => void;
  setAmount: (number: number) => void;
  addToCart: (item: ICartItem) => void;
  removeFromCart: (id: number) => void;
  updateCartItemQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const useRestaurantStore = create<RestaurantStore>()(
  persist(
    (set) => ({
      tableNumber: 0,
      roomId: 0,
      roomName: "",
      paymentMethodId: 0,
      amount: 0,
      cart: [],

      setTableNumber: (number: number) => set({ tableNumber: number }),

      setRoomId: (number: number) => set({ roomId: number }),

      setRoom: (value: string | null) => set({ roomName: value }),

      setPaymentMethodId: (number: number) => set({ paymentMethodId: number }),

      setAmount: (number: number) => set({ amount: number }),

      addToCart: (newItem) =>
        set((state) => {
          const existingItemIndex = state.cart.findIndex((item) => item.id === newItem.id);
          if (existingItemIndex !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingItemIndex] = {
              ...updatedCart[existingItemIndex],
              quantity: updatedCart[existingItemIndex].quantity + 1,
            };
            return { cart: updatedCart };
          } else {
            return {
              cart: [
                ...state.cart,
                {
                  ...newItem,
                  quantity: 1,
                },
              ],
            };
          }
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      updateCartItemQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? { ...item, quantity }
              : item
          ),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'restaurant-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useRestaurantStore