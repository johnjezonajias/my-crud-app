'use client'

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { MainNavigation } from '@/components/MainNavigation';

interface FormData {
  name: string;
  age: string;
}

interface DataItem {
  _id: string;
  name: string;
  age: string;
}

export default function Dashboard(): JSX.Element {
  const [data, setData] = useState<DataItem[]>([]);
  const [form, setForm] = useState<FormData>({ name: '', age: '' });
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    fetch('/api/read')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch('/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    setForm({ name: '', age: '' });
    const updatedData = await fetch('/api/read').then((res) => res.json());
    setData(updatedData);
  };

  const handleUpdate = async (id: string) => {
    let newName: string | null = null;
    do {
      newName = prompt('Enter new name');
    } while (newName === null || newName.trim() === '');

    let newAge: string | null = null;
    do {
      newAge = prompt('Enter new age');
    } while (newAge === null || newAge.trim() === '' || isNaN(parseInt(newAge)));

    if (newName && newAge) {
        await fetch('/api/update', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, name: newName, age: newAge }),
        });

        const updatedData = await fetch('/api/read').then((res) => res.json());
        setData(updatedData);
    } else {
      console.error('New name and age are required');
    }
  };

  const handleDelete = async (id: string) => {
    await fetch('/api/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    const updatedData = await fetch('/api/read').then((res) => res.json());
    setData(updatedData);
  };

  return (
    <div className="w-full p-10">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <MainNavigation />
      <div className="bg-neutral-800 mt-12 px-8 py-12 rounded-md">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-gray-400 block w-full text-black px-4 py-2 mb-4 rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-600"
          />
          <input
            type="text"
            placeholder="Age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            className="bg-gray-400 block w-full text-black px-4 py-2 mb-4 rounded-md focus:outline-none focus:border-blue-500 placeholder-gray-600"
          />
          <button
            type="submit"
            className="px-14 py-3 bg-black text-white uppercase rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Create
          </button>
        </form>
      </div>
      <div className="bg-neutral-800 mt-2 px-8 py-12 rounded-md">
        <ol>
          {data.map((item) => (
            <li key={item._id} className="flex items-center justify-between py-2 border-t border-gray-700 last:border-b">
              <span>{item.name} - {item.age}</span>
              <div>
                <button
                  onClick={() => handleUpdate(item._id)}
                  className="px-2 py-1 mr-2 bg-gray-400 text-xs text-black rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-2 py-1 bg-gray-700 text-xs text-gray-400 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );  
}
