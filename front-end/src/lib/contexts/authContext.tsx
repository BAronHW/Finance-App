'use client'
import { ReactNode, useContext, useEffect, useCallback } from 'react'
import { auth } from '@/lib/firebase/firebase'
import React, { useState } from 'react'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { GET_SINGLE_USERID_BY_UID } from '../graphql/Users'
import { useLazyQuery } from '@apollo/client'
import { LoaderCircle } from 'lucide-react'

interface UserQueryResponse {
    getUserByUid: {
        id: number
        __typename: string
    }
}

export interface AuthContextType {
    currentUser: User | null
    userLoggedIn: boolean
    loading: boolean
    userId: number | null
    logOut(): Promise<void>
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = React.createContext<AuthContextType | undefined>(
    undefined
)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    const [userId, setUserId] = useState<number | null>(null)
    const router = useRouter()

    const [getSingleUserIdByUid] = useLazyQuery<UserQueryResponse>(
        GET_SINGLE_USERID_BY_UID,
        {
            onCompleted: (data) => {
                if (data?.getUserByUid?.id) {
                    setUserId(data.getUserByUid.id)
                }
            },
            onError: (error) => {
                console.error('Error fetching user ID:', error)
            },
        }
    )

    const initialiseUser = useCallback(
        async (user: User | null) => {
            setLoading(true)
            try {
                if (user) {
                    setCurrentUser(user)
                    setUserLoggedIn(true)
                    await getSingleUserIdByUid({
                        variables: { uid: user.uid },
                    })
                } else {
                    setCurrentUser(null)
                    setUserLoggedIn(false)
                    setUserId(null)
                    console.log(user)
                    if (!window.location.pathname.includes('/sign-in')) {
                        router.replace('/sign-in')
                    }
                }
            } catch (error) {
                console.error('Error initializing user:', error)
            } finally {
                setLoading(false)
            }
        },
        [router, getSingleUserIdByUid]
    )

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initialiseUser)
        return () => unsubscribe()
    }, [initialiseUser])

    const logOut = async (): Promise<void> => {
        try {
            await signOut(auth)
            setCurrentUser(null)
            setUserLoggedIn(false)
            setUserId(null)
            router.replace('/')
        } catch (err) {
            console.error('Error during logout:', err)
        }
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading,
        userId,
        logOut,
    }

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div className="flex items-center justify-center">
                    <LoaderCircle />
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    )
}
