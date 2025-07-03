import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { loginUser } from "../config/liveapi";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AuthSignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);
      console.log(response, "response from loginUser");
      toast.success("Login successful!");
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("userEmail", response.user.email);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Login failed");
    }
  };
  const { setTheme, theme } = useTheme();
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
      {/* Left: Sign In Form */}
      <div className="flex flex-col justify-center w-full max-w-xl px-8 py-12 mx-auto lg:w-1/2">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Sign In</h1>
          <p className="text-muted-foreground">
            Enter your email below to login to your account.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
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
              placeholder="info@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="text-sm font-medium">
                Password <span className="text-red-500">*</span>
              </label>
              <Link to="#" className="text-xs text-primary hover:underline">
                Forgot your password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-3 py-2 rounded-md bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Sign In
          </Button>
        </form>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to="/auth/signup" className="text-primary hover:underline">
            Sign Up
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
          <h2 className="text-2xl font-bold mb-2">EduTech</h2>
          <p className="text-muted-foreground text-center max-w-xs">
            A platform for learning, sharing, and collaborating on educational content.
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
