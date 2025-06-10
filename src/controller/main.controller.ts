// src/controllers/user.controller.ts
import { Request, Response } from 'express';

export const getMainRouteResponse = (req: Request, res: Response) => {
  res.send('Yo TypeScript server is alive! 🧠🚀');
};
