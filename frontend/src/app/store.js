import { configureStore } from '@reduxjs/toolkit'
import foodSlice from './slices/foodSlice'
import authSlice from './slices/authSlice'
import cartSlice from './slices/cartSlice'

export default configureStore({
  reducer: {
    food:foodSlice,
    auth:authSlice,
    cart:cartSlice
  },
})