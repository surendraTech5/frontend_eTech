import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import { registerUser } from "../config/liveapi";
import { FaEye } from "react-icons/fa6";
import { FaEyeLowVision } from "react-icons/fa6";
import { toast } from "react-toastify";

export default function AuthSignUp() {
  const { setTheme, theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      toast.error("Please agree to the terms.");
      return;
    }

    try {
      await registerUser(formData);
      toast.success("Registered successfully!");
      navigate("/auth/signin");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    }
  };
  return (
    <div className="flex min-h-screen relative">
      {/* Top left: Back to Dashboard link */}
      <Link
        to="/"
        className="absolute top-4 left-4 text-sm text-muted-foreground hover:underline flex items-center gap-2 z-20"
      >
        <span className="text-lg">&larr;</span> Back to Dashboard
      </Link>
      {/* Header with theme switcher */}
      <div className="absolute top-0 right-0 flex items-center gap-2 p-4 z-10">
        <ThemeSwitcher />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
      {/* Left: Sign Up Form */}
      <div className="flex flex-col justify-center w-full max-w-xl px-8 py-12 mx-auto lg:w-1/2">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Sign Up</h1>
          <p className="text-muted-foreground">
            Enter your information to create an account.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block mb-1 text-sm font-medium"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                required
                className="w-full px-3 py-2 rounded-md bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block mb-1 text-sm font-medium"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                required
                className="w-full px-3 py-2 rounded-md bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="phoneNumber"
                className="block mb-1 text-sm font-medium"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phoneNumber"
                type="number"
                required
                className="w-full px-3 py-2 rounded-md bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="gender"
                className="block mb-1 text-sm font-medium"
              >
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="w-full px-3 py-2 rounded-md bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-3 py-2 rounded-md bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              autoComplete="new-password"
              require
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute mt-3 ml-2 cursor-pointer"
            >
              {showPassword ? (
                <FaEye className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                <FaEyeLowVision className="fill-gray-500 dark:fill-gray-400 size-5" />
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="terms"
              type="checkbox"
              required
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary"
            />
            <label htmlFor="terms" className="text-xs text-muted-foreground">
              By creating an account you agree to our{" "}
              <span className="text-primary">Terms &amp; Conditions</span> and{" "}
              <span className="text-primary">Privacy Policy</span>.
            </label>
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Sign Up
          </Button>
        </form>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/auth/signin" className="text-primary hover:underline">
            Sign In
          </Link>
        </div>
      </div>
      {/* Right: Branding */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-card border-l border-border relative">
        <div className="flex flex-col items-center">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-6"
          >
            <rect width="60" height="60" rx="12" fill="#18181B" />
            <path
              d="M30 15V45"
              stroke="hsl(var(--primary))"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M20 25V45"
              stroke="hsl(var(--primary))"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M40 35V45"
              stroke="hsl(var(--primary))"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          <h2 className="text-2xl font-bold mb-2">TailAdmin</h2>
          <p className="text-muted-foreground text-center max-w-xs">
            Free and Open-Source Tailwind CSS Admin Dashboard Template
          </p>
        </div>
        {/* Theme switcher at bottom right */}
        <div className="absolute bottom-6 right-6 flex items-center gap-2">
          <ThemeSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
