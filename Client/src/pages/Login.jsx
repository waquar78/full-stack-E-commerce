import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/auth/authApi";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const [registerUser, { isLoading: registerIsLoading, isSuccess: registerIsSuccess, error: registerError }] = useRegisterUserMutation();
  const [loginUser, { isLoading: loginIsLoading, isSuccess: loginIsSuccess, error: loginError }] = useLoginUserMutation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isSignup) {
        await registerUser(formData);
      } else {
        await loginUser({ email: formData.email, password: formData.password });
      }
    } catch (error) {
      console.log("Error: ", error?.data?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (registerIsSuccess) {
      toast.success("Signup successful.");
      setFormData({ name: "", email: "", password: "" });
    }
    if (registerError) {
      toast.error(registerError?.data?.message || "Signup Failed");
    }
  }, [registerIsSuccess, registerError]);

  useEffect(() => {
    if (loginIsSuccess) {
      toast.success("Login successful.");
      setFormData({ name: "", email: "", password: "" });
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError?.data?.message || "Login Failed");
    }
  }, [loginIsSuccess, loginError]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/ecommerce-background_965427-2217.jpg?w=2000')", backgroundAttachment: "fixed" }}
      />
      <div className="relative z-10 bg-black p-8 rounded-2xl shadow-lg w-96 opacity-80 text-white">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        <form className="mt-6" onSubmit={handleSubmit}>
          {isSignup && (
            <div>
              <label className="block text-gray-600">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your name" />
            </div>
          )}
          <div className="mt-4">
            <label className="block text-gray-600">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your email" />
          </div>
          <div className="mt-4">
            <label className="block text-gray-600">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your password" />
          </div>
          <button type="submit" className="w-full mt-6 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-400" disabled={isSubmitting || registerIsLoading || loginIsLoading}>
            {isSubmitting ? "Processing..." : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button className="text-blue-500 hover:underline" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}
