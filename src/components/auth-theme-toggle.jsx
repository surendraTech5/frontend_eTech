import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "./theme-switcher";

export function AuthThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="absolute bottom-8 right-8 flex items-center gap-2">
      <div className="rounded-full bg-background/30 backdrop-blur-sm hover:bg-background/50">
        <ThemeSwitcher />
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="rounded-full h-14 w-14 bg-background/30 backdrop-blur-sm hover:bg-background/50"
      >
        <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
} 