import React from 'react'
import { useAuth } from '@/lib/contexts/authContext'
import { auth } from '@/lib/Firebase/Firebase'

export default function () {
    // const { currentUser } = useAuth()
    const firebaseCurrentUser = auth.currentUser

    // console.log(currentUser)
    console.log(firebaseCurrentUser)

    return (
        <div className="p-4">
            {/* {currentUser && (
                <div>
                    <p>Context User Email: {currentUser.email}</p>
                    <p>Context User ID: {currentUser.uid}</p>
                </div>
            )} */}

            {firebaseCurrentUser && (
                <div>
                    <p>Firebase User Email: {firebaseCurrentUser.email}</p>
                    <p>Firebase User ID: {firebaseCurrentUser.uid}</p>
                </div>
            )}

            {/* {!currentUser && !firebaseCurrentUser && (
                <p>No user is currently signed in</p>
            )} */}
        </div>
    )
}
