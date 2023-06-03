import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import mediaContentReducer from '../features/mediaContents/mediaContentSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mediaContents: mediaContentReducer,
  },
})