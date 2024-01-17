import { Request, Response } from 'express';
import { RequireAuthProp } from '@clerk/clerk-sdk-node';

export const me = async (req: RequireAuthProp<Request>, res: Response) => {
  res.json(req.auth);
};
