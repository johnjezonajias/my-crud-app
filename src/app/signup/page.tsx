'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SignupForm from "@/components/SignupForm";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

const SignupPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center mt-12">
      <h1 className="text-3xl font-bold">Signup</h1>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
