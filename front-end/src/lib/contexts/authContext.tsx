'use client'

import { ReactNode, useContext, useEffect, useState } from 'react'
import { auth } from '@/lib/firebase/firebase'
import React from 'react'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { LogOut } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useQuery } from '@apollo/client'
import { FETCH_UID_FROM_USER } from '../graphql/Users'

export interface AuthContextType {
    currentUser: User | null
    userLoggedIn: boolean
    loading: boolean
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
    const router = useRouter()
    const params = useParams()
    const userId = params.userId

    // const { data, error, refetch } = useQuery(FETCH_UID_FROM_USER, {
    //     variables: { userId },
    // })

    // const [currentUserUid, setcurrentUserUid] = useState(data)

    useEffect(() => {
        onAuthStateChanged(auth, initialiseUser)
    }, [])
    const initialiseUser = (user: User | null) => {
        setLoading(true)
        if (user) {
            setCurrentUser(user)
            setUserLoggedIn(true)
        } else {
            setCurrentUser(null)
            setUserLoggedIn(false)
            router.push('/sign-in')
        }
        setLoading(false)
    }

    const compareIdToCurrentUser = (currUser: string, currUserId: number) => {
        // fetch the uid of the given curruserid
        // if the uid fetched doesnt match the uid of the currentuser.uid then redirect to /
    }

    const logOut = async (): Promise<void> => {
        try {
            await signOut(auth)
            setCurrentUser(null)
            setUserLoggedIn(false)
            router.push('/')
        } catch (err) {
            console.log(err)
        }
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading,
        logOut,
    }

    /**
     * Todo:
     * 1. either make a new wrapper component (HOC higher order component) that checks if the user is signed in or not
     * or modify this component to make it so that it wraps around root layout.tsx and does the checking
     */

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
