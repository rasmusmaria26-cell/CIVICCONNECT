import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => {
        const t = localStorage.getItem('token');
        return (t && t !== 'undefined' && t !== 'null') ? t : null;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                try {
                    const savedUser = localStorage.getItem('user');
                    if (savedUser && savedUser !== 'undefined' && savedUser !== 'null') {
                        setUser(JSON.parse(savedUser));
                    }
                } catch (e) {
                    console.error("Auth Restoration Error:", e);
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    setToken(null);
                }
            }
            setLoading(false);
        };
        initializeAuth();
    }, [token]);

    const login = async (email, password) => {
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        const { token: newToken, user: userData } = res.data;

        setToken(newToken);
        setUser(userData);
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    };

    const register = async (name, email, password, role) => {
        const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role });
        const { token: newToken, user: userData } = res.data;

        setToken(newToken);
        setUser(userData);
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
