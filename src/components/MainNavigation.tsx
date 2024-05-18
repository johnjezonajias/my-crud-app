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
                    <span className="text-gray-500">You&apos;re logged in as <span className="text-gray-300 underline">{user.email}</span></span>
                ) : (
                    <span className="text-gray-500">Hello, please <Link href="/signup" className="text-gray-200">signup</Link> or <Link href="/login" className="text-gray-200">login</Link>.</span>
                )}
            </div>
            <div className="w-auto flex items-end gap-x-10">
                <Link href="/" className="text-md text-gray-300 hover:text-gray-600 font-medium transition duration-300 uppercase">
                    Home
                </Link>
                {!user ? (
                    <>
                        <Link href="/login" className="text-md text-gray-300 hover:text-gray-600 font-medium transition duration-300 uppercase">
                            Login
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/dashboard" className="text-md text-gray-300 hover:text-gray-600 font-medium transition duration-300 uppercase">
                            Dashboard
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-md text-red-500 hover:text-red-700 font-medium transition duration-300 uppercase"
                            >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
