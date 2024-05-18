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
    <div className="w-[600px] p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-gray-400 block w-full text-black px-4 py-2 mb-4 rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-600"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-gray-400 block w-full text-black px-4 py-2 mb-4 rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-600"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="bg-gray-400 block w-full text-black px-4 py-2 mb-4 rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-600"
        />
        <button
          type="submit"
          className="w-full px-4 py-3 bg-gray-800 text-sm text-gray-300 uppercase rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
