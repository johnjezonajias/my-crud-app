import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'DELETE') {
    const client = await clientPromise;
    const db = client.db('mydatabase');
    const collection = db.collection('mycollection');
    
    try {
      const { id } = req.body;
      if (!id || !ObjectId.isValid(id)) {
        res.status(400).json({ error: 'Invalid or missing ID' });
        return;
      }

      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        res.status(404).json({ error: 'Document not found' });
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete document' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
