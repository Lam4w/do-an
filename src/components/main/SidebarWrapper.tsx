"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { cn } from "@/lib/utils";
import {
  FileStack,
  Home,
  Receipt,
  Settings,
  SquareUser,
  Trash2,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { ReactNode, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/Resizable";
import { Separator } from "../ui/Separator";
import { TooltipProvider } from "../ui/Tooltip";
import { Sidebar } from "./Sidebar";

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
        className="min-h-screen"
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
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "w-full flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_img]:h-9 [&_img]:w-9 [&_img]:shrink-0",
                  isCollapsed &&
                    "block h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>img]:hidden",
                )}
              >
                <span className="flex items-center">
                  {userImg && (
                    <Image
                      className="rounded aspect-square-full w-full h-full object-contain"
                      src={userImg}
                      alt="profile picture"
                      width={256}
                      height={256}
                    />
                  )}
                  <span
                    className={cn("ml-2 truncate", isCollapsed && "hidden")}
                  >
                    {userEmail}
                  </span>
                </span>
                <div className=""></div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel
                  onSelect={(e) => {
                    e.preventDefault();
                    signOut({
                      callbackUrl: `/`,
                    });
                  }}
                >
                  Log out
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
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
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className="">{children}</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
};

export default SidebarWrapper;
