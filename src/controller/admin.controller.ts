import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary";
import { Product } from "../models/Product";
import { Admin } from "../models/Admin";
import jwt from "jsonwebtoken";

export const createAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const username = req?.body?.username;
    const password = req?.body?.password;
    const token = req?.body?.token;

    console.log('req: ', req);
    console.log('token: ', token);
    console.log('username: ', username);
    console.log('password: ', password);

    if (token?.toString() === process.env.CREATE_ADMIN) {
      const admin = new Admin({ username, password });
      await admin.save();
      res.status(201).redirect("/admin/admin-login");
    } else {
      res.status(400).json({ error: "Invalid Token! Leave the platform bruh it ain't for ya." });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to create user, Bruh!" });
  }
};

export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  const username = req?.body?.username;
  const password = req?.body?.password;

  const admin = await Admin.findOne({ username });
  if (!admin) res.status(401).json({ error: "Invalid credentials Yo, Quit acting smart." });

  const isMatch = await admin?.comparePassword(password);
  if (!isMatch) res.status(401).json({ error: "Invalid credentials Yo, Quit acting smart." });

  const token = jwt.sign({ id: admin?._id, role: "admin" }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  res.json({ token });
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  let imageId = "";
  let imageUrl = "";
  if (!req.file) {
    res.status(400).json({ error: "Yo, No file uploaded" });
    return;
  } else {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          transformation: [{ width: 300, height: 400, crop: "fill", gravity: "auto" }],
        },
        async (error, result) => {
          if (error && !result) {
            console.log(error);
            res.status(500).json({ error: "Ayo!! Error uploading to Cloudinary" });
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
                isAvailable: req?.body?.isAvailable === "on",
              };
              const product = new Product(payload);
              await product.save();
              res.status(201).json(product);
              return;
            } catch (err) {
              console.error(err);
              res.status(400).json({ error: "Create user failed miserably bruh." });
              return;
            }
          }
        }
      )
      .end(req.file.buffer);
  }
};

export const testingProductApi = async (req: Request, res: Response): Promise<void> => {
  let imageId = "";
  let imageUrl = "";
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded homie." });
    return;
  } else {
    try {
      const payload = {
        name: req?.body?.name,
        description: req?.body?.description,
        price: req?.body?.price,
        imageId: imageId,
        imageUrl: imageUrl,
        category: req?.body?.category || "clothing_men",
        stock: req?.body?.stock,
        tags: req?.body?.tags || ["vibe"],
        isAvailable: req?.body?.isAvailable === "on",
      };
      res.status(201).json({ message: "Product created successfully! You did it homie!", data: payload }).redirect("/upload-form");
      return;
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "User creation failed bruh!" });
      return;
    }
  }
};
