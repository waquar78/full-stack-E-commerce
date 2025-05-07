import Product from "../models/Product.js";

// ========================= CREATE PRODUCT =========================
export const createProduct = async (req, res) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({ success: false, message: "Only sellers can create products" });
    }

    const { name, stock, category, price, description, photo } = req.body;

    if (!name || !stock || !category || !price || !description || !photo) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const product = new Product({
      name,
      stock,
      category,
      price,
      description,
      photo,
      sellerId: req.user.userId,
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ========================= GET ALL PRODUCTS =========================
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 

// ========================= GET SINGLE PRODUCT =========================
export const singleProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const singleProduct = await Product.findById(productId);

    if (!singleProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product detail fetched successfully",
      product: singleProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ========================= UPDATE PRODUCT =========================
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id, sellerId: req.user.userId },
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(403).json({ message: "Unauthorized or product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ========================= DELETE PRODUCT =========================
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({
      _id: req.params.id,
      sellerId: req.user.userId,
    });

    if (!deletedProduct) {
      return res.status(403).json({ message: "Unauthorized or product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ========================= FILTER + PAGINATION =========================
export const getFilteredProducts = async (req, res) => {
  try {
    const { keyword, category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (keyword) filter.name = { $regex: keyword, $options: "i" };
    if (category) filter.category = category;
    if (minPrice && maxPrice) {
      if (parseInt(minPrice) > parseInt(maxPrice)) {
        return res.status(400).json({ message: "minPrice cannot be greater than maxPrice" });
      }
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find(filter).skip(skip).limit(parseInt(limit));
    const totalCount = await Product.countDocuments(filter);

    res.status(200).json({
      products,
      totalCount,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalCount / parseInt(limit)),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ========================= SELLER PRODUCT FILTER =========================
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.user.userId });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
