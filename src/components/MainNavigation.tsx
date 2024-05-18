'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut, User } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export const MainNavigation = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className="flex items-center justify-between gap-x-10">
            <div className="w-auto">
                {user ? (
                    <span className="text-gray-500">Welcome, {user.email}</span>
                ) : (
                    <span className="text-gray-500">Welcome! Please <Link href="/signup" className="text-blue-500">Signup</Link></span>
                )}
            </div>
            <div className="w-auto flex items-end gap-x-10">
                <Link href="/" className="text-blue-500">
                    Home
                </Link>
                {!user ? (
                    <>
                        <Link href="/login" className="text-blue-500">
                            Login
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/dashboard" className="text-blue-500">
                            Dashboard
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-red-500 hover:text-red-700 font-medium transition duration-300"
                            >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
