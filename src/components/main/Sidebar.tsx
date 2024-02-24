"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/Button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/Tooltip";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    url: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    action?: () => void
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
            <div className={cn(
              "w-full",
              !!link.action && "cursor-pointer"
            )}
              onClick={() => {
                if (!!link.action) link.action()
              }}
            >
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.url}
                    className={cn(
                      buttonVariants({ variant: link.variant, size: "icon" }),
                      "h-9 w-9",
                      link.variant === "default" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                      !!link.action && "pointer-events-none"
                    )}
                    aria-disabled={link.action ? true : false} 
                    tabIndex={link.action ? -1 : undefined}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
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
            </div>
          ) : (
            <div className={cn(
              "w-full",
              !!link.action && "cursor-pointer"
            )}
              onClick={() => {
                if (!!link.action) link.action()
              }}
            >
              <Link
                key={index}
                href={link.url}
                className={cn(
                  "w-full",
                  buttonVariants({ variant: link.variant, size: "sm" }),
                  link.variant === "default" &&
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  "justify-start",
                  !!link.action && "pointer-events-none"
                )}
                aria-disabled={link.action ? true : false} 
                tabIndex={link.action ? -1 : undefined}
              >
                <link.icon className="mr-2 h-4 w-4" />
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
              </Link>
            </div>
          ),
        )}
      </nav>
    </div>
  );
}