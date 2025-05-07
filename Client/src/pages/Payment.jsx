import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function PaymentForm() {
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();

    toast.success("Payment Successful!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-start justify-center pt-20">
      <div className="relative w-full max-w-xl bg-white p-8 rounded-2xl shadow-2xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-gray-600 hover:text-blue-600"
        >
          <FaArrowLeft size={20} />
        </button>

        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Payment Form</h2>

        <form onSubmit={handlePayment}>
          <div className="mb-5">
            <label className="block text-gray-700 mb-1">Cardholder Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 mb-1">Card Number</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div className="flex gap-4 mb-5">
            <div className="w-1/2">
              <label className="block text-gray-700 mb-1">Expiry Date</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 mb-1">CVV</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="123"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}
