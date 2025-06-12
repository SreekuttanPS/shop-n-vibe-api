import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary";
import { Product } from "../models/Product";

export const getProducts = (req: Request, res: Response) => {
  res.send("Get all products");
};
