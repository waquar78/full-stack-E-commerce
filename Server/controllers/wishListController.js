import Wishlist from "../models/wishlist.js";
import Product from "../models/Product.js";

/* Add to Wishlist */
export const addToWishlist = async (req, res) => {
  try {
    if (!req.user.userId) {
      return res.status(401).json({ message: "Unauthorized! Please log in." });
    }

    const { productId } = req.body;
    const userId = req.user.userId;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        userId,
        products: [productId],
      });
    } else {
      if (wishlist.products.includes(productId)) {
        return res.status(400).json({ message: "Product already in wishlist" });
      }
      wishlist.products.push(productId);
    }

    await wishlist.save();
    res.status(200).json({ message: "Product added to wishlist", wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/** ✅ Remove from Wishlist */
export const removeFromWishlist = async (req, res) => {
  try {
    if (!req.user.userId) {
      return res.status(401).json({ message: "Unauthorized! Please log in." });
    }

    const { productId } = req.body;
    const userId = req.user.userId;

    let wishlist = await Wishlist.findOne({ userId }); 

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter((p) => !p.equals(productId));

    if (wishlist.products.length === 0) {
      await Wishlist.deleteOne({ _id: wishlist._id });
      return res.status(200).json({ message: "Wishlist is now empty" });
    }

    await wishlist.save();
    res.status(200).json({ message: "Product removed from wishlist", wishlist });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/** ✅ Get Wishlist */
export const getWishlist = async (req, res) => {
  try {
    if (!req.user.userId) {
      return res.status(401).json({ message: "Unauthorized! Please log in." });
    }

    const userId = req.user.userId;
    const wishlist = await Wishlist.findOne({ userId }).populate("products");

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist is empty" });
    }

    res.status(200).json({ wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
