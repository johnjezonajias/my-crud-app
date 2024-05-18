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
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
