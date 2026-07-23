"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Wallet, ArrowRight } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);
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

      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-slate-100 via-white to-indigo-50 px-6">
        {/* Background Decorations */}
        <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/5 blur-3xl" />
        <div className="w-full max-w-md">
          {/* Branding */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-primary to-indigo-600 shadow-xl">
              <Wallet className="h-10 w-10 text-white" />
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              Mind Your Own Budget
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              AI-powered startup expense management platform
            </p>
          </div>

          {/* Login Card */}
          <div className="relative rounded-3xl border border-white/40 bg-white/80 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Welcome Back 👋
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Sign in to continue managing your startup finances.
              </p>
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-12 text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary to-indigo-600 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Register */}
            <p className="mt-6 text-center text-sm text-slate-600">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-primary hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
