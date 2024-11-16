const express = require("express");
const {
  createProductController,
  getAllProductsController,
  updateProductController,
  deleteProductController,
  getProductPhotoController,
  getSingleProductController,
} = require("../Controllers/productController");
const { isAdmin, requireSignIn } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create-product", requireSignIn, isAdmin, createProductController);

router.post("/update-product/:id", requireSignIn, isAdmin, updateProductController);

router.get("/get-product", getAllProductsController);

router.get("/get-product/:slug", getSingleProductController);

router.get("/product-photo/:uuid", getProductPhotoController);

router.delete("/delete-product/:id", deleteProductController);

module.exports = router;
