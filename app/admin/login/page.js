"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { logoMain } from "@/lib/site-content";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AdminLogin() {
  const [email, setEmail] = useState("wuorial120@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Welcome to VIDO Admin!");
        router.push("/admin");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          backgroundImage:
            "linear-gradient(rgba(14, 47, 68, 0.82), rgba(14, 47, 68, 0.82)), url(/uploads/login-page-background.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <img
            src={logoMain}
            alt="VIDO logo"
            className="w-28 h-28 object-contain mx-auto mb-4"
          />
          <p className="text-gray-500 text-sm mt-1">
            Voice of Youth Development Organization
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="form-label">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="wuorial120@gmail.com"
              required
            />
          </div>

          <div>
            <label className="form-label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input pr-12"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="spinner w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Logging in...
              </>
            ) : (
              "Login to Dashboard"
            )}
          </button>
        </form>
      </div>
      </div>

      <Footer />
    </>
  );
}
