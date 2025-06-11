// src/controllers/user.controller.ts
import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary";
import { Product } from "../models/Product";

export const getProducts = (req: Request, res: Response) => {
  res.send("Get all products");
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  let imageId = "";
  let imageUrl = "";
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  } else {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          transformation: [{ width: 300, height: 400, crop: "fill", gravity: "auto" }],
        },
        (error, result) => {
          if (error && !result) {
            console.log(error);
            res.status(500).json({ error: "Error uploading to Cloudinary" });
            return;
          } else {
            imageId = result?.public_id || "";
            imageUrl = result?.secure_url || "";
            try {
              const payload = {
                name: req?.body?.name,
                description: req?.body?.description,
                price: req?.body?.price,
                imageId: imageId,
                imageUrl: imageUrl,
                category: req?.body?.category || "clothing_men",
                stock: req?.body?.stock,
                tags: req?.body?.tags || ["test"],
                isAvailable: req?.body?.isAvailable || false,
              };
              Product.create(payload);
              res.status(201).json({ message: "Product created successfully!", data: payload });
              return;
            } catch (err) {
              console.error(err);
              res.status(400).json({ error: "Failed to create user" });
              return;
            }
          }
        }
      )
      .end(req.file.buffer);
  }
};