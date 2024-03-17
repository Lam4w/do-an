"use client";

import { Sidebar } from "@/components/main/Sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/Resizable";
import { Separator } from "@/components/ui/Separator";
import { TooltipProvider } from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";
import {
  FileStack,
  Home,
  LogOut,
  Receipt,
  Settings,
  SquareUser,
  Trash2,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarWrapperProps {
  userEmail: string | null | undefined;
  userImg: string | null | undefined;
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  children: ReactNode;
}

export default function SidebarWrapper({
  userEmail,
  userImg,
  defaultLayout = [250, 1100],
  defaultCollapsed = false,
  navCollapsedSize,
  children,
}: SidebarWrapperProps) {
  const pathName = usePathname()
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState<boolean>(defaultCollapsed);

  const getPathname = (pathName: string) => {
    return pathName.split("/")[1]
  }

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
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
              isCollapsed
            )}`;
          }}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              isCollapsed
            )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "w-full flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_img]:h-9 [&_img]:w-9 [&_img]:shrink-0",
                  isCollapsed &&
                    "block h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>img]:hidden"
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
                    className={cn(
                      "ml-2 truncate text-sm",
                      isCollapsed && "hidden"
                    )}
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
          <div className="flex flex-col h-[90vh] justify-between">
            <div className="">
              <Sidebar
                isCollapsed={isCollapsed}
                links={[
                  {
                    title: "My CVs",
                    icon: FileStack,
                    variant: getPathname(pathName) === "dashboard" ? "default" : "ghost",
                    action: () => router.push('/dashboard')
                  },
                  {
                    title: "My page",
                    icon: SquareUser,
                    variant: getPathname(pathName) === "pages" ? "default" : "ghost",
                    action: () => router.push('/pages')
                  },
                  {
                    title: "Archive",
                    icon: Trash2,
                    variant: getPathname(pathName) === "archive" ? "default" : "ghost",
                    action: () => router.push('/archive')
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
                    variant: getPathname(pathName) === "settings" ? "default" : "ghost",
                    action: () => router.push('/settings')
                  },
                  {
                    title: "Billing",
                    icon: Receipt,
                    variant: getPathname(pathName) === "billing" ? "default" : "ghost",
                    action: () => router.push('/billing')
                  },
                  {
                    title: "Go back",
                    icon: Home,
                    variant: "ghost",
                    action: () => router.push('/')
                  },
                ]}
              />
              <Separator />
            </div>

            <div className="">
              <Separator />
              <Sidebar
                isCollapsed={isCollapsed}
                links={[
                  {
                    title: "Logout",
                    icon: LogOut,
                    variant: "ghost",
                    action: () => {
                      signOut({
                        callbackUrl: `/`,
                      });
                    },
                  },
                ]}
              />
            </div>
          </div>
          <p
            className={cn(
              "truncate text-sm text-muted-foreground text-center",
              isCollapsed && "hidden"
            )}
          >
            Version: 0.3.1
          </p>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className="">{children}</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}