const ProductModel = require("../models/productModel");
const CategoryModel = require("../models/categoryModels");
const slugify = require("slugify");
const Multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

//Multer configuration
const storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random() * 1e9}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = Multer({
  storage,
  limits: { fileSize: 10000 * 100 },
}).single("photo");

exports.createProductController = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, message: "File upload failed" });
      }

      const { name, slug, description, category, price, shipping } = req.body;
      const { filename, path, size } = req.file;

      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is required" });
        case !description:
          return res.status(500).send({ error: "Description is required" });
        case !category:
          return res.status(500).send({ error: "Category is required" });
        case !price:
          return res.status(500).send({ error: "Price is required" });
        case size > 10000000:
          return res.status(500).send({
            error: "Photo is required and size must be less than 1mb",
          });
      }

      const product = new ProductModel({
        ...req.body,
        slug: slugify(name),
        photo: { filename, path, size, uuid: uuidv4() },
      });

      await product.save();
      res.status(400).json({
        success: true,
        message: "Product created successfully",
        product,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in catch block of create product controller",
    });
  }
};

exports.updateProductController = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, message: "File upload failed" });
      }

      const { name, slug, description, category, price, shipping } = req.body;
      const { filename, path, size } = req.file;

      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is required" });
        case !description:
          return res.status(500).send({ error: "Description is required" });
        case !category:
          return res.status(500).send({ error: "Category is required" });
        case !price:
          return res.status(500).send({ error: "Price is required" });
        case size > 10000000:
          return res.status(500).send({
            error: "Photo is required and size must be less than 1mb",
          });
      }

      const product = new ProductModel.findByIdAndUpdate({
        ...req.body,
        slug: slugify(name),
        photo: { filename, path, size, uuid: uuidv4() },
      });

      res.status(400).json({
        success: true,
        message: "Product created successfully",
        product,
      });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: "Error in catch block of update products controller",
      error: error.message,
    });
  }
};

exports.getAllProductsController = async (req, res) => {
  try {
    const product = await ProductModel.find({})
      .populate("category") // Populate the 'category' field
      .select("-photo")
      .limit(10)
      .sort({ createdAt: -1 });
    if (!product) {
      return res.status(500).send({
        success: false,
        message: "Product fetched failed",
      });
    }
    res.status(200).send({
      success: true,
      total_count: product.length,
      message: "All products are fetched successfully",
      product,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: "Error in catch block of get all products controller",
      error: error.message,
    });
  }
};

exports.getSingleProductController = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ slug: req.params.slug })
      .populate("category")
      .select("-photo");
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).send({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      mesaage: "Error in catch block of get single product controleer",
    });
  }
};

exports.getProductPhotoController = async (req, res) => {
  try {
    const file = await ProductModel.findOne({ "photo.uuid": req.params.uuid });
    if (!file) {
      res.status(500).send({
        success: false,
        message: "Error in fetching product photo",
      });
    }
    const filePath = path.join(__dirname, "..", file.photo.path);
    // res.status(200).send({
    //     success:true,
    //     message:"Product photo fetched successfully",
    //     uuid: file.photo.uuid,
    //     fileName: file.photo.filename,
    //     fileSize: file.photo.size,
    //     filePath

    // })
    res.sendFile(filePath);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: "Error in catch block of get product photo controller",
    });
  }
};

exports.deleteProductController = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id).select(
      "-photo"
    );
    res.status(200).send({
      success: true,
      message: "Product deleted suceesfully",
      product,
    });
  } catch (error) {
    console.log(error.mesaage);
    res.status(500).send({
      success: false,
      message: "Error in catch block of delete product controller",
    });
  }
};

// filters
exports.productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await ProductModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// product count
exports.productCountController = async (req, res) => {
  try {
    const total = await ProductModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
exports.productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await ProductModel.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
exports.searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await ProductModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
exports.realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await ProductModel.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get prdocyst by catgory
exports.productCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    const products = await ProductModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};
