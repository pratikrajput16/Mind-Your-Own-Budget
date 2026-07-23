"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";
import { removeToken } from "@/lib/auth";
import { useAuth } from "@/contexts/AuthContext";

import {
  LayoutDashboard,
  Receipt,
  Sparkles,
  PiggyBank,
  TrendingUp,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Expenses",
    href: "/dashboard/expenses",
    icon: Receipt,
  },
  {
    title: "AI Insights",
    href: "/dashboard/insights",
    icon: Sparkles,
  },
  {
    title: "Budget",
    href: "/dashboard/budget",
    icon: PiggyBank,
  },
  {
    title: "Investments",
    href: "/dashboard/investments",
    icon: TrendingUp,
  },
  {
    title: "AI Assistant",
    href: "/dashboard/chat",
    icon: MessageSquare,
  },
];

const bottomNavItems = [
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { setUser } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    removeToken();

    setUser(null);

    router.push("/login");
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-lg font-semibold tracking-tight">FinCo.</span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-sidebar-border px-3 py-4">
        <ul className="flex flex-col gap-1">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {!collapsed && <span>Logout</span>}
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
