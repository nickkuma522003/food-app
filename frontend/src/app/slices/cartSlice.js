import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: []
  },
  reducers: {

    setCart: (state, action) => {
      state.value = action.payload
    },
    addToCart: (state, action) => {
     
      state.value = [...state.value,action.payload];
      
    },
   
    removeFromCart: (state, action) => {
      const updatedCart = state.value.filter(item => item.idMeal !== action.payload.idMeal);
      state.value = updatedCart;
    }
  },
})


export const { setCart, addToCart,removeFromCart } = cartSlice.actions

export default cartSlice.reducer