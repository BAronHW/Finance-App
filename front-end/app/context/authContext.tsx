'use client'

import { createContext, useState, ReactNode, useContext } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const login = () => {
        setIsAuthenticated(true);
    }

    const logout = () => {
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            token,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);