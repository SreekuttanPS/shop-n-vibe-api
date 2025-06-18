import { Router } from "express";
import { verifyAdmin } from "../middleware/auth";
import upload from "../utils/multer";
import { adminLogin, createAdmin, createProduct, testingProductApi } from "../controller/admin.controller";
import validator from "../validations/validator";
import productValidationRules from "../validations/productValidations";
import { productPage } from "../samples/productTest";
import { adminPage } from "../samples/adminPage";
import { createAdminPage } from "../samples/createAdminPage";

const router = Router();

router.get("/create-product", (_req, res) => {
  res.send(productPage);
});
router.post("/create-product", upload.single("image"), productValidationRules, validator, createProduct);
// router.post("/create-product", upload.single("image"), verifyAdmin, testingProductApi);

router.get("/admin-login", (_req, res) => {
  res.send(adminPage);
});
router.post("/admin-login", adminLogin);

router.get("/admin-create", (_req, res) => {
  res.send(createAdminPage);
});
router.post("/admin-create", createAdmin);

export default router;
