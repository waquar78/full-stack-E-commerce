import Order from "../models/Order.js";
import Cart from "../models/cart.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId; //  Authenticated User ID
    const { paymentMethod, shippingAddress } = req.body;

    //  Check if cart exists for user
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty!" });
    }

    //  Calculate total amount
    const totalAmount = cart.products.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    //  Create order
    const order = new Order({
      userId,
      products: cart.products.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
      paymentMethod,
      shippingAddress,
    });

    await order.save();

    //  Clear cart after order is placed
    await Cart.findOneAndDelete({ userId });

    res.status(201).json({ message: "Order placed successfully!", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//  Fetch user orders
export const getOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await Order.find({ userId }).populate("products.productId");

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//  Cancel Order
export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.userId;

    const order = await Order.findOne({ _id: orderId, userId });

    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }

    if (order.orderStatus !== "Pending") {
      return res.status(400).json({ message: "Order cannot be cancelled!" });
    }

    order.orderStatus = "Cancelled";
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully!", order });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
