// src/controllers/user.controller.ts
import { Request, Response } from 'express';

export const getProducts = (req: Request, res: Response) => {
  res.send('Get all products');
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      message: 'Image uploaded successfully!' + JSON.stringify(req.file?.originalname) || 'bruh',
      url: req.file?.path,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Upload failed',
      error: err
    });
  }
};