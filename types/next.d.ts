import { NextApiRequest } from 'next';

declare module 'next' {
  interface NextApiRequest {
    user?: { userId: string }; // Or whatever shape your 'user' object should have
  }
}
