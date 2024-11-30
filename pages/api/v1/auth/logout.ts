// pages/api/logout.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  // Clear the session or authentication cookie here
  res.setHeader('Set-Cookie', 'token=; Max-Age=0; path=/; HttpOnly');  // Adjust to match your cookie settings

  return res.status(200).json({ message: 'Logged out successfully' });
}
