"use client";

import { cn } from "@/lib/utils";
import {
  FileStack,
  Home,
  Receipt,
  Settings,
  SquareUser,
  Trash2,
} from "lucide-react";
import React, { ReactNode, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/Resizable";
import { Separator } from "../ui/Separator";
import { TooltipProvider } from "../ui/Tooltip";
import { Sidebar } from "./Sidebar";
import { buttonVariants } from "../ui/Button";
import { Avatar, AvatarFallback } from "../ui/Avatar";
import Image from "next/image";
import { Icons } from "../Icons";
import UserAvatar from "../default/UserAvatar";

interface SidebarWrapperProps {
  userEmail: string | null | undefined;
  userImg: string | null | undefined;
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  children: ReactNode;
}

const SidebarWrapper = ({
  userEmail,
  userImg,
  defaultLayout = [250, 1100],
  defaultCollapsed = false,
  navCollapsedSize,
  children,
}: SidebarWrapperProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(defaultCollapsed);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onExpand={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              isCollapsed,
            )}`;
          }}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              isCollapsed,
            )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out",
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2",
            )}
          >
            <div
              className={cn(
                "w-full flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
                isCollapsed &&
                  "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden",
                buttonVariants({ variant: "outline" }),
              )}
            >
              <div className="flex items-center space-x-5 truncate">
                <UserAvatar userEmail={userEmail} userImage={userImg} />

                <span className={cn("ml-2 truncate", isCollapsed && "hidden")}>
                  {userEmail}
                </span>
              </div>
            </div>
          </div>
          <Separator />
          <Sidebar
            isCollapsed={isCollapsed}
            links={[
              {
                title: "My CVs",
                icon: FileStack,
                url: "/dashboard",
                variant: "default",
              },
              {
                title: "My page",
                icon: SquareUser,
                url: "/",
                variant: "ghost",
              },
              {
                title: "Trash",
                icon: Trash2,
                url: "/",
                variant: "ghost",
              },
            ]}
          />
          <Separator />
          <Sidebar
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Settings",
                icon: Settings,
                url: "/",
                variant: "ghost",
              },
              {
                title: "Billing",
                icon: Receipt,
                url: "/",
                variant: "ghost",
              },
              {
                title: "Go back",
                icon: Home,
                url: "/",
                variant: "ghost",
              },
            ]}
          />
          <Separator />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={defaultLayout[1]}
          minSize={30}
          // onResize={() => console.log("resizing")}
        >
          <div className="">{children}</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default SidebarWrapper;
