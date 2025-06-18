import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  imageId: string;
  imageUrl: string;
  category: string;
  stock: number;
  tags?: string[];
  rating?: number;
  rateCount?: number;
  isAvailable?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    imageId: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: ["clothing_men", "clothing_women", "electronics", "accessories_men", "accessories_women", "furnitures", "others"],
      default: "others",
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      min: 0,
    },
    rateCount: {
      type: Number,
      min: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", productSchema);
