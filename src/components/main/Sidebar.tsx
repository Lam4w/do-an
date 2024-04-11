"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/Button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/Tooltip";
import { useRouter } from "next/navigation";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    proplan: boolean
    action: () => void
  }[];
}

export function Sidebar({ links, isCollapsed }: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip delayDuration={0} key={index}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    buttonVariants({ variant: link.variant, size: "icon" }),
                    "h-9 w-9 cursor-pointer",
                    link.variant === "default" &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                    link.proplan ? "cursor-none pointer-events-none" : "",
                  )}
                  onClick={link.action}
                >
                  <link.icon className={cn("h-4 w-4", link.proplan ? "text-muted-foreground" : "")} />
                  <span className="sr-only">{link.title}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <div
              key={index}
              className={cn(
                "w-full cursor-pointer",
                buttonVariants({ variant: link.variant, size: "sm" }),
                link.variant === "default" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start",
                link.proplan ? "cursor-none pointer-events-none" : "",
                link.proplan && "text-muted-foreground"
              )}
              onClick={link.action}
            >
              <link.icon className={cn("mr-2 h-4 w-4", link.proplan ? "text-muted-foreground" : "")} />
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    "ml-auto",
                    link.variant === "default" &&
                    "text-background dark:text-white",
                  )}
                >
                  {link.label}
                </span>
              )}
            </div>
          ),
        )}
      </nav>
    </div>
  );
}