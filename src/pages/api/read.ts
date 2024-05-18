'use client'

import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const client = await clientPromise;
  const db = client.db('mydatabase');
  const collection = db.collection('mycollection');
  
  try {
    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
