'use client'

import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') {
    const client = await clientPromise;
    const db = client.db('mydatabase');
    const collection = db.collection('mycollection');

    try {
      const result = await collection.insertOne(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to insert data' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
