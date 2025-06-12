import { body } from "express-validator";

const productValidationRules = [
  body("name").notEmpty().withMessage("Product name is required").isLength({ min: 3 }).withMessage("Product name must be at least 3 characters"),
  body("description").notEmpty().withMessage("Description is required"),
  body("price").notEmpty().withMessage("Price is required"),
  // body("image").notEmpty().withMessage("Image is required"),
  // body("category").notEmpty().withMessage("Category is required"),
  body("stock").notEmpty().withMessage("Stock is required"),
  // body("tags").notEmpty().withMessage("tags are required"),
];

export default productValidationRules;
