import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import {
  LayoutGrid,
  Calendar,
  BookCopy,
  Clock,
  User,
  Lock,
  PanelLeft,
  BarChart2,
  ChevronDown,
  Sun,
  Moon,
  FileText,
  LogOut,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "./theme-switcher";
import { getAllUsers } from "../config/liveapi";

// ------------------- Menu Config -------------------

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutGrid,
    href: "/",
  },
  {
    label: "Courses",
    icon: Calendar,
    href: "/courses",
    isCollapsible: true,
    subItems: [{ label: "List Of Course", href: "/courses" }],
  },
  {
    label: "Subject",
    icon: BookCopy,
    href: "/subjects",
    isCollapsible: true,
    subItems: [{ label: "List Of Subject", href: "/subjects" }],
  },
  {
    label: "Lecture",
    icon: Clock,
    href: "/lectures",
    isCollapsible: true,
    subItems: [{ label: "All Lectures", href: "/lectures" }],
  },
  {
    label: "User Profile",
    icon: User,
    href: "/profile",
  },
  {
    label: "Forms",
    icon: FileText,
    href: "/sample-form",
    isCollapsible: true,
    subItems: [{ label: "Sample Form", href: "/sample-form" }],
  },
];

const otherItems = [
  {
    label: "Authentication",
    icon: Lock,
    href: "/auth",
    isCollapsible: true,
    subItems: [
      { label: "Sign In", href: "/auth/signin" },
      { label: "Sign Up", href: "/auth/signup" },
    ],
  },
];

// ------------------- Components -------------------

function MainNav({ currentUser }) {
  const location = useLocation();
  const { state: sidebarState } = useSidebar();

  const renderMenuItem = (item) => {
    const isActive =
      item.href === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(item.href) && item.href !== "/";

    if (item.isCollapsible) {
      const isChildActive =
        item.subItems &&
        item.subItems.some((subItem) => location.pathname === subItem.href);

      return (
        <Collapsible
          defaultOpen={isActive || isChildActive}
          className="group/collapsible"
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start h-10 px-3",
                (isActive || isChildActive) && "bg-accent text-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5 mr-3 shrink-0" />
              <span className={cn("truncate", sidebarState === "collapsed" && "hidden")}>
                {item.label}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 ml-auto shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180",
                  sidebarState === "collapsed" && "hidden"
                )}
              />
            </Button>
          </CollapsibleTrigger>
          {sidebarState === "expanded" &&
            item.subItems?.length > 0 && (
              <CollapsibleContent className="py-1">
                <ul className="ml-8 my-1 flex flex-col gap-1 border-l border-muted-foreground/30">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.href}>
                      <Link
                        to={subItem.href}
                        className={cn(
                          "text-xs text-muted-foreground hover:text-foreground pl-4 pr-2 py-1.5 block rounded-md w-full",
                          location.pathname === subItem.href &&
                            "text-foreground font-semibold bg-primary/10"
                        )}
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            )}
        </Collapsible>
      );
    }

    return (
      <Link to={item.href} key={item.label}>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start h-10 px-3",
            isActive && "bg-accent text-accent-foreground"
          )}
        >
          <item.icon className="h-5 w-5 mr-3 shrink-0" />
          <span className={cn("truncate", sidebarState === "collapsed" && "hidden")}>
            {item.label}
          </span>
        </Button>
      </Link>
    );
  };

  return (
    <nav className="flex flex-col gap-1 px-2 py-4">
      <div className="px-3 mb-2 text-[10px] uppercase text-muted-foreground tracking-wider">Menu</div>
      {menuItems.map(renderMenuItem)}
      <div className="px-3 mt-4 mb-2 text-[10px] uppercase text-muted-foreground tracking-wider">Others</div>
      {otherItems.map(renderMenuItem)}
    </nav>
  );
}

function UserNav({ user }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate("/auth/signin", { replace: true });
  };
  const fullName = user ? `${user.firstName} ${user.lastName}` : "Guest";
  const email = user?.email || "guest@example.com";
  const avatar = user?.profilePhoto || "https://i.pravatar.cc/150?u=default";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative flex items-center gap-2 h-10 px-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src={avatar} alt={fullName} />
            <AvatarFallback>{(user?.firstName || "U")[0]}</AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-sm font-medium">{fullName}</span>
          </div>
          <ChevronDown className="hidden sm:inline-block h-4 w-4 ml-1 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile">
            <User className="mr-2 h-4 w-4" />
            <span>Edit profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Header({ currentUser }) {
  const { toggleSidebar } = useSidebar();
  const { setTheme, theme } = useTheme();

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-4 sm:px-6 sticky top-0 z-20">
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="shrink-0">
        <PanelLeft />
      </Button>
      <div className="ml-auto flex items-center gap-2">
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
        <UserNav user={currentUser} />
      </div>
    </header>
  );
}

// ------------------- MainLayout -------------------

export default function MainLayout({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userEmail = localStorage.getItem("userEmail");
        const res = await getAllUsers(token);
        if (res.success) {
          const user = res.users.find((u) => u.email === userEmail);
          if (user) setCurrentUser(user);
        }
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="border-b">
          <div className="flex items-center gap-2.5 h-16 pr-4 pl-12 md:px-4">
            <BarChart2 className="w-7 h-7 text-primary" />
            <span className={cn("text-base font-bold text-foreground", "group-data-[collapsible=icon]:hidden")}>
              EduTech
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <MainNav currentUser={currentUser} />
        </SidebarContent>
      </Sidebar>
      <div className="flex flex-col flex-1 min-w-0">
        <Header currentUser={currentUser} />
        <main className="flex-1 bg-background overflow-x-hidden">{children}</main>
      </div>
    </SidebarProvider>
  );
}
