'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const SignupForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
    }
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push('/dashboard');
    } catch (error) {
        setError((error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="block w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="block w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        className="block w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Signup
      </button>
    </form>
  );
};

export default SignupForm;