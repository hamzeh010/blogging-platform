// pages/api/posts/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../utils/lib/mongodb';
import Post from '../../../../models/Post';

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await connectToDatabase();

  if (req.method === 'GET') {
    // Get a specific post by ID
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } else if (req.method === 'PUT') {
    // Update a specific post
    try {
      const { title, content, description, category, details } = req.body;
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { title, content, description, category, details, updatedAt: new Date() },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to update post' });
    }
  } else if (req.method === 'DELETE') {
    // Delete a specific post
    try {
      await Post.findByIdAndDelete(id);
      res.status(204).end();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to delete post' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handlePost;
