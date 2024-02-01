"use client";

import { cn } from "@/lib/utils";
import { FileStack, Receipt, Settings, SquareUser, Trash2 } from "lucide-react";
import React, { ReactNode, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/Resizable";
import { Separator } from "../ui/Separator";
import { TooltipProvider } from "../ui/Tooltip";
import { AccountSwitcher } from "./AccountSwitcher";
import { Sidebar } from "./Sidebar";

interface SidebarWrapperProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  children: ReactNode;
}

const SidebarWrapper = ({
  accounts,
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
            <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
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
            ]}
          />
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
