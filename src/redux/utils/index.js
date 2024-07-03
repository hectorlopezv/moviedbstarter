import { configureStore } from '@reduxjs/toolkit'

export const setupStore = ({preloadedState, reducer, middleware}) => {
  return configureStore({
    reducer,
    preloadedState,
    middleware
  })
}