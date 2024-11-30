import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectToDatabase from '../../../../utils/lib/mongodb';
import User from '../../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ message: 'Email, password, and username are required' });
  }

  try {
    await connectToDatabase();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create and save the new user
    const user = new User({
      email: email,
      username: username,
      password: hashedPassword,
    });
    console.log('Username:', username); // Log username to check
    try {
      const savedUser = await user.save();

      console.log('User saved:', savedUser); // Log the saved user document
    } catch (error) {
      console.error('Error saving user:', error); // Log the full error details
      res.status(500).json({ message: 'Error saving user', error });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });

    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error('Error creating user:', error); // Log the full error message for debugging
    res.status(500).json({ message: 'Error creating user' });
  }
}
