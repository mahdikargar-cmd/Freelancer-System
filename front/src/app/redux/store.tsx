// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // مسیر صحیح به authSlice شما

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;
