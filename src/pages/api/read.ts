import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { withAuth } from '../../utils/authMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = client.db('mydatabase');
  const collection = db.collection('mycollection');
  
  try {
    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Read: Failed to fetch data' });
  }
}

export default handler;
