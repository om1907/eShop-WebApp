const express = require("express");
const {
  createProductController,
  getAllProductsController,
  updateProductController,
  deleteProductController,
  getProductPhotoController,
  getSingleProductController,
  productFiltersController,
} = require("../Controllers/productController");
const { isAdmin, requireSignIn } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create-product", requireSignIn, isAdmin, createProductController);

router.post("/update-product/:id", requireSignIn, isAdmin, updateProductController);

router.get("/get-products", getAllProductsController);

router.get("/get-product/:slug", getSingleProductController);

router.get("/product-photo/:uuid", getProductPhotoController);

router.delete("/delete-product/:id", deleteProductController);

router.post('/product-filters',productFiltersController);

module.exports = router;
