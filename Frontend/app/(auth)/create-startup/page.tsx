"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createStartup } from "@/services/startup.service";

export default function CreateStartupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    teamSize: 1,
    monthlyBudget: 0,
    currency: "INR",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "teamSize" || name === "monthlyBudget" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createStartup(formData);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to create startup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-900">
          Create Your Startup
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Startup Name *
          </label>
          <input
            name="name"
            placeholder="Startup Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border p-3 text-black placeholder:text-gray-400"
            required
          />

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Industry *
          </label>
          <input
            name="industry"
            placeholder="Industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full rounded-lg border p-3 text-black placeholder:text-gray-400"
            required
          />

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Team Size *
          </label>
          <input
            type="number"
            name="teamSize"
            placeholder="Team Size"
            value={formData.teamSize}
            onChange={handleChange}
            className="w-full rounded-lg border p-3 text-black placeholder:text-gray-400"
          />

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Monthly Budget (₹) *
          </label>
          <input
            type="number"
            name="monthlyBudget"
            placeholder="Monthly Budget"
            value={formData.monthlyBudget}
            onChange={handleChange}
            className="w-full rounded-lg border p-3 text-black placeholder:text-gray-400"
          />

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Currency *
          </label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900"
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black py-3 text-white font-semibold"
          >
            {loading ? "Creating..." : "Create Startup"}
          </button>
        </form>
      </div>
    </div>
  );
}
