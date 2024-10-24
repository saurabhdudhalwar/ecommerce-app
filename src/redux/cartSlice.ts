import { createSlice } from '@reduxjs/toolkit';


const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return { items: [], total: 0 };
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Could not load state', e);
    return { items: [], total: 0 };
  }
};

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (e) {
    console.error('Could not save state', e);
  }
};

const initialState: any = loadState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: any) => {
      const existingProduct = state.items.find(
        (item:any) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price;
      saveState(state);
    },
    removeFromCart: (state, action: any) => {
      const productIndex = state.items.findIndex(
        (item:any) => item.id === action.payload
      );
      if (productIndex >= 0) {
        state.total -=
          state.items[productIndex].price * state.items[productIndex].quantity;
        state.items.splice(productIndex, 1);
        saveState(state);
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
