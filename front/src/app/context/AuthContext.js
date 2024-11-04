import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

// Create initial state
const initialState = {
    isLoggedIn: false,
    userId: null,
};

// Create context
const AuthContext = createContext();

// Auth reducer function
const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOGIN':
            return { ...state, isLoggedIn: true, userId: action.payload };
        case 'SET_LOGOUT':
            return { ...state, isLoggedIn: false, userId: null };
        default:
            return state;
    }
};

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('/api/auth/status', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // فرض بر این است که توکن JWT در localStorage ذخیره شده است
                    }
                });
                if (response.data.isLoggedIn) {
                    dispatch({ type: 'SET_LOGIN', payload: response.data.userId });
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };

        checkLoginStatus();
    }, []);


    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
