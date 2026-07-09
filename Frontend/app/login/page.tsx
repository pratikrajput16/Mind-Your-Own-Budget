"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setToken } from "@/lib/auth";
import toast, { Toaster } from "react-hot-toast";
import { login } from "@/services/auth.service";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();

  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await login({
        email,
        password,
      });

      const token = response.data.token;

      setToken(token);

      setUser(response.data.user);

      toast.success("Login Successful!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
          <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

          <input
            className="w-full border p-3 rounded mb-4"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full border p-3 rounded mb-6"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded hover:bg-gray-800"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </>
  );
}
