import { createSlice } from '@reduxjs/toolkit'

export const foodSlice = createSlice({
  name: 'food',
  initialState: {
    categories: null,
    category:"Beef",
    items:null,
  },
  reducers: {
   
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    setCategory:(state,action)=>{
        state.category = action.payload
    },
    setItems:(state,action)=>{
        state.items = action.payload
    }
  },
})


export const { setCategories,setCategory,setItems } = foodSlice.actions

export default foodSlice.reducer