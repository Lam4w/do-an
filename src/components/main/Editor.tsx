"use client";

import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  BookMarked,
  HelpCircle,
  PanelLeft,
  PanelTop,
} from "lucide-react";
import { useRef, useState } from "react";
import SyntaxHelper from "./SyntaxHelper";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/HoverCard";

const Editor = () => {
  const [isSplit, SetIsSplit] = useState<boolean>(false);
  const leftTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const rightTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <div className="w-full grid grid-cols-3 space-x-10">
      <div className="flex flex-col space-y-5 col-span-2">
        <div className="flex justify-between items-center">
          <div className="flex space-x-3 items-center">
            <ArrowLeft className="w-6 h-6 cursor-pointer hover:text-gray-500 transition" />
            <Input
              className="w-52 bg-[#f6f6f6] text-lg border-none hover:bg-gray-300 transition"
              defaultValue="My first CV"
            />
          </div>
          <div className="flex items-center justify-center space-x-3">
            <HoverCard>
              <HoverCardTrigger>
                <HelpCircle className="text-gray-500 cursor-pointer" />
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm">Nothing yet</p>
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger>
                <BookMarked className="text-gray-500 cursor-pointer" />
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm">
                  Create a snapshot with your current content
                </p>
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger>
                <PanelTop
                  className={cn(
                    "text-gray-500 cursor-pointer",
                    !isSplit && "text-emerald-500",
                  )}
                  onClick={() => SetIsSplit(false)}
                />
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm">Single layout</p>
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger>
                <PanelLeft
                  className={cn(
                    "text-gray-500 cursor-pointer",
                    isSplit && "text-emerald-500",
                  )}
                  onClick={() => SetIsSplit(true)}
                />
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm">Split layout</p>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
        <div className="col-span-2">
          <div
            className={cn(
              "grid",
              isSplit ? "grid-cols-2 space-x-3" : "grid-cols-1",
            )}
          >
            <SyntaxHelper />
            {isSplit && <SyntaxHelper />}
          </div>
        </div>
      </div>

      <div className="flex flex-col col-span-1">
        <div className="relative rounded-sm overflow-hidden cursor-pointer">
          <iframe
            src="https://resumey.pro/resume/html/82bb4ec2-465b-450d-b854-4a33b53630e5/"
            title="Preview"
            className="border-none overflow-hidden h-[1102px] w-[816px] object-cover origin-top-left"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Editor;
