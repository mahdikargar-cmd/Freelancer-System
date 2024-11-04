import React, {createContext, useState, useEffect, useContext} from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const isLoggedIn = !!user;
    console.log("is logged", isLoggedIn);


    const loginSuccess = (userData) => {
        const token = userData.token; // Ensure token is coming from backend response
        if (token) {
            localStorage.setItem('token', token); // Store token in localStorage
            setUser(userData.user); // Set user data
        } else {
            console.error("Token missing in response");
        }
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("token is :", token)

        if (token) {
            checkLoginStatus(); // Check login status if token exists
        } else {
            setLoading(false); // End loading if no token
        }
    }, []);


    const logout = () => {
        localStorage.removeItem('token'); // حذف توکن هنگام خروج
        setUser(null); // حذف اطلاعات کاربر
    };
    const checkLoginStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token missing');

            const response = await axios.get('http://localhost:5000/api/auth/status', {
                headers: {Authorization: `Bearer ${token}`},
            });
            setUser(response.data.user); // Set user if authenticated
            console.log(response.data.user)
        } catch (error) {
            console.error('Error checking login status:', error.message);
            localStorage.removeItem('token'); // Remove token on error
            setUser(null);
        } finally {
            setLoading(false); // End loading after check
        }
    };
    return (
        <AuthContext.Provider value={{user, loginSuccess, logout, error, loading, isLoggedIn}}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
