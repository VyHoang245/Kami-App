import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            setIsLoggedIn(!!token);
        };
        checkToken();
    }, []);

    const login = async (token: string) => {
        await AsyncStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
