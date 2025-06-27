import React from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation,
  useEmptyCartMutation,
  useCheckoutMutation,
} from "@/features/cart/cartApi";
import Header from "./Header";

const CartPage = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetCartQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [removeFromCart] = useRemoveFromCartMutation();
  const [updateQuantity] = useUpdateCartQuantityMutation();
  const [emptyCart] = useEmptyCartMutation();
  const [checkout] = useCheckoutMutation();

 

  if (isLoading)
    return <p className="text-center text-lg">Loading Cart...</p>;

  if (error) {
    console.error("Cart fetch error:", error);
    return (
      <p className="text-center text-red-500">
       please add the item into the cart
      </p>
    );
  }

  const cart =
    data?.cart && Array.isArray(data.cart.products)
      ? data.cart
      : { products: [], totalPrice: 0 };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <Header />

      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
        <button onClick={() => navigate("/")}>
          <IoArrowBack className="text-2xl text-gray-500" />
        </button>
        🛒 Your Cart
      </h2>

      {cart.products.length === 0 ? (
        <p className="text-lg text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.products.map((item) => {
              if (!item.productId) return null;

              const product = item.productId;
              const subtotal = product.price * item.quantity;

              return (
                <div
                  key={product._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between bg-white shadow p-4 rounded-lg"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <img
                      src={
                        product.photo ||
                        "https://dummyimage.com/100x100/cccccc/000000&text=No+Image"
                      }
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="text-center sm:text-left">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-500">
                        ₹{product.price} x {item.quantity}
                      </p>
                      <p className="text-sm font-medium">
                        Subtotal: ₹{subtotal}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center sm:justify-end gap-2 mt-4 sm:mt-0">
                    <button
                      onClick={() =>
                        updateQuantity({
                          productId: product._id,
                          quantity:
                            item.quantity > 1 ? item.quantity - 1 : 1,
                        })
                      }
                      className="px-2 py-1 bg-gray-200 rounded text-lg"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity({
                          productId: product._id,
                          quantity: item.quantity + 1,
                        })
                      }
                      className="px-2 py-1 bg-gray-200 rounded text-lg"
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        removeFromCart({ productId: product._id })
                      }
                      className="ml-3 text-red-600 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xl font-semibold">
              Total: ₹
              {cart.products.reduce((acc, item) => {
                if (!item.productId) return acc;
                return acc + item.productId.price * item.quantity;
              }, 0)}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => emptyCart()}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Empty Cart
              </button>
              <button
                onClick={() => navigate("/payment")}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Buy now
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
