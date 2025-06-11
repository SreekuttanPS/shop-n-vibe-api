import { Router } from "express";
import { createProduct, getProducts } from "../../controller/product.controller";
import upload from "../../utils/multer";
import validator from "../../validations/validator";
import productValidationRules from "../../validations/api/productValidations";

const router = Router();

router.get("/", getProducts);
router.post("/", upload.single("image"), productValidationRules, validator, createProduct);
// router.post("/", upload.single("image"), createProduct);

export default router;
