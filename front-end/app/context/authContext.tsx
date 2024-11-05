'use client'

import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { auth } from '@/lib/Firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    user: User | null;
    login: (newToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    token: null,
    user: null,
    login: async () => {},
    logout: async () => {}
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                firebaseUser.getIdToken().then(idToken => {
                    setUser(firebaseUser);
                    setToken(idToken);
                    setIsAuthenticated(true);
                    localStorage.setItem('token', idToken);
                });
            } else {
                setUser(null);
                setToken(null);
                setIsAuthenticated(false);
                localStorage.removeItem('token');
            }
        });

        return () => unsubscribe();
    }, []);

    const login = (newToken: string) => {
        setToken(newToken);
        setIsAuthenticated(true);
        localStorage.setItem('token', newToken);
    };

    const logout = () => {
        auth.signOut().then(() => {
            setUser(null);
            setToken(null);
            setIsAuthenticated(false);
            localStorage.removeItem('token');
        });
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            token,
            user,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);