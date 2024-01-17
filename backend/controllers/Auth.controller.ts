import { Request, Response } from 'express';
import { RequireAuthProp } from '@clerk/clerk-sdk-node';
import prisma from '../lib/db.server.js';

export const me = async (req: RequireAuthProp<Request>, res: Response) => {
  const auth = req.auth;
  const user = await prisma.user.findUnique({
    where: {
      id: auth?.userId,
    },
    include: {
      roles: {
        select: {
          name: true,
        },
      },
    },
  });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};
