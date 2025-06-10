import { Request, Response } from 'express';
import { User } from '../models/User';

export const getUsers = (req: Request, res: Response) => {
  res.send('Get all users');
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to create user" });
  }
};