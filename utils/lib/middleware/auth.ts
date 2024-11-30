import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

interface DecodedToken extends JwtPayload {
  userId: string;
}

export const authMiddleware = (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, 'secretkey') as DecodedToken; // Cast to DecodedToken

    // Ensure that decoded contains the expected userId
    if (!decoded.userId) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded; // Now `req.user` will have the correct type `{ userId: string }`
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
