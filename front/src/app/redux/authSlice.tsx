import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoggedIn: false,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state) => {
            state.isLoggedIn = true;
            state.loading = false; // Reset loading state on success
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.loading = false;
            state.error = null;
        }
    }
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;

export const checkLoginStatus = () => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const response = await axios.get('http://localhost:5000/api/');
        if (response.data.isAuthenticated) {
            dispatch(loginSuccess());
        } else {
            dispatch(logout());
        }
    } catch (error) {
        dispatch(loginFailure("خطا در بررسی وضعیت ورود"));
    }
};

export default authSlice.reducer;
