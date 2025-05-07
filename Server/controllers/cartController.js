import Cart from "../models/cart.js";
import Product from "../models/Product.js"

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId; // Authenticated user ID 

    // Check if Product Exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if Cart Exists for User
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If Cart Doesn't Exist, Create New Cart
      cart = new Cart({
        userId,
        products: [{ productId, quantity, price: product.price }],
      });
    } else {
      // If Cart Exists, Check if Product is Already in Cart
      const productIndex = cart.products.findIndex((p) =>
        p.productId.equals(productId)
      );

      if (productIndex > -1) {
        // Update Existing Product Quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // Add New Product
        cart.products.push({ productId, quantity, price: product.price });
      }
    }

    // Save Cart
    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.userId;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Cart se product remove karna
    cart.products = cart.products.filter((p) => !p.productId.equals(productId));

    // Agar cart me koi product nahi bacha to cart hi delete kar do
    if (cart.products.length === 0) {
      await Cart.deleteOne({ _id: cart._id });
      return res.status(200).json({ message: "Cart is now empty" });
    }

    await cart.save();
    res.status(200).json({ message: "Product removed from cart", cart });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//get my cart


export const getMyCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOne({ userId }).populate({
      path: "products.productId",
      strictPopulate: false,
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//quantity update

export const updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.products.find(p => p.productId.equals(productId));
    if (!item) return res.status(404).json({ message: "Product not in cart" });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ message: "Quantity updated", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//empty cart

export const emptyCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    await Cart.deleteOne({ userId });
    res.status(200).json({ message: "Cart emptied successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to empty cart" });
  }
};
 