'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from "@/components/LoginForm";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

const LoginPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="h-full flex flex-col items-center justify-center mt-12">
      <h1 className="text-3xl font-bold">Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
