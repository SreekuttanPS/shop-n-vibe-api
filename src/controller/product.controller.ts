import { Request, Response } from "express";
import { Product } from "../models/Product";

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.status(200).json(product);
    return;
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    return;
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    // Filters
    const { category, minPrice, maxPrice, inStock, isAvailable, tags, search, sortBy } = req.query;

    const filter: any = {};

    // CATEGORY
    if (category) filter.category = category;

    // PRICE RANGE
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // STOCK > 0
    if (inStock === "true") {
      filter.stock = { $gt: 0 };
    }

    // isAvailable BOOLEAN
    if (isAvailable === "true" || isAvailable === "false") {
      filter.isAvailable = isAvailable === "true";
    }

    // TAGS (matches any tag)
    if (tags) {
      const tagArray = (tags as string).split(",");
      filter.tags = { $in: tagArray };
    }

    // SEARCH (on name & description)
    if (search) {
      const keyword = new RegExp(search as string, "i"); // i = case-insensitive
      filter.$or = [{ name: { $regex: keyword } }, { description: { $regex: keyword } }];
    }

    let sortOption: any = {};
    if (sortBy) {
      const [key, order] = sortBy?.toString().split("_");
      sortOption[key] = order === "desc" ? -1 : 1;
    } else {
      sortOption.createdAt = -1; // Default: Newest first
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
    return;
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    return;
  }
};

/*
================================================================================================================
| Field	         |   Query Param	                                    |       Description                      |    
================================================================================================================
| category	     |   category=electronics	                            |     Exact match                        |   
| price	         |   minPrice=100&maxPrice=1000	                      |     Range filtering                    |       
| stock	         |   inStock=true	                                    |     Only available items               |        
| tags	         |   tags=summer,casual	                              |     Match any tag in array             |           
| isAvailable	   |   isAvailable=true	                                |     Boolean filter                     |   
| search	       |   search=shirt	                                    |     Partial match on name/description  |    
| sortBy         |   ?sortBy=price_asc / price_desc / createdAt_desc  |     Sort                               |
================================================================================================================
*/
