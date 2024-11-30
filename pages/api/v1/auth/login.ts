import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../utils/lib/mongodb';
import User from '../../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'No matching user found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id.toString() }, 'secretkey', { expiresIn: '1h' });
    res.status(200).json({
      message: 'Login successful',
      token,
      username: user.username,
      userId: user._id, // Return userId here
    });
  } catch (error) {
    console.error(error);  // Log the error to the console
    res.status(500).json({ message: 'Error logging in' });
  }
}
