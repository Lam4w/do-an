"use client";

import SnapshotModal from "@/components/main/CVModal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/Resizable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { designTemplates } from "@/lib/const";
import { cn } from "@/lib/utils";
import "@/styles/editor.css";
import { Settings, Snapshot } from "@prisma/client";
import {
  ArrowLeft,
  BookMarked,
  HelpCircle,
  PanelLeft,
  PanelTop,
  RotateCw,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import NovelEditor from "@/components/editor/NovelEditor";
import { useCreateSnapshot, useUpdateSnapshotContent } from "@/lib/client/queries";
import { JSONContent } from "novel";

interface EditorProps {
  snapshot: Snapshot;
  contentMain: JSONContent;
  onChangeContentMain: (content: JSONContent) => void;
  contentSide: JSONContent;
  onChangeContentSide: (content: JSONContent) => void;
  settings: Settings;
  onChangeSettings: (field: string, value: string | number | boolean) => void;
  title: string;
  onChangeTitle: (title: string) => void;
}

function Editor({ 
  snapshot, 
  contentMain, 
  contentSide, 
  onChangeContentMain, 
  onChangeContentSide, 
  onChangeSettings, 
  onChangeTitle, 
  settings, 
  title 
} : EditorProps) {
  const router = useRouter();
  const [isIframeloading, setIsIframeloading] = useState<boolean>(true);
  const [currHeight, setCurrHeight] = useState<number>(0);
  const scaledContent = useRef<HTMLIFrameElement | null>(null);
  const [source, setSource] = useState<string>(
    `/html?cv=${snapshot.cvId}` +
      (!!snapshot.id ? `&snapshot=${snapshot.id}` : "")
  );
  const { mutate: updateContent, isPending } = useUpdateSnapshotContent()
  const { mutate: createSnapshot, isPending: isCreatePending } = useCreateSnapshot()

  const handleCreateSnapshot = (snapshotTitle: string) => {
    createSnapshot({
      cvId: snapshot.cvId,
      title: snapshotTitle,
      contentMain: JSON.stringify(contentMain),
      contentSide: JSON.stringify(contentSide),
      settings: settings,
    })
  }

  const applyScaling = (
    scaledWrapper: HTMLDivElement,
    scaledContent: HTMLIFrameElement
  ) => {
    scaledContent.style.transform = "scale(1, 1)";

    let { width: cw } = scaledContent.getBoundingClientRect();
    let { width: ww } = scaledWrapper.getBoundingClientRect();
    let scaleAmtX = Math.min(ww / cw);
    let scaleAmtY = scaleAmtX;
    scaledContent.style.transform = `scale(${scaleAmtX}, ${scaleAmtY})`;

    setCurrHeight(1102 * scaleAmtY);
  };

  // useCallback becasue useRef an object ref doesn’t notify about changes to the current ref value. Using a callback ref ensures that even if a child component displays the measured node later will still get notified about it in the parent component and can update the measurements.
  const scaledWrapper = useCallback((node: HTMLDivElement) => {
    if (node !== null && scaledContent.current) {
      // Reports changes to the dimensions of an Element's content
      const resizeObserver = new ResizeObserver(() => {
        // Do the logic when the size of the element changes
        if (node && scaledContent.current) {
          applyScaling(node, scaledContent.current);
        }
      });
      resizeObserver.observe(node);
    }
  }, []);

  const handleEditTitle = (code: string) => {
    if (code === "Enter") {
      updateContent(
        {
          cvId: snapshot.cvId,
          snapshotId: snapshot.id,
          title: title,
          contentMain: JSON.stringify(contentMain),
          contentSide: JSON.stringify(contentSide),
          settings: settings,
        }
      );
    }
  };

  useEffect(() => {
    updateContent(
      {
        cvId: snapshot.cvId,
        snapshotId: snapshot.id,
        title: title,
        contentMain: JSON.stringify(contentMain),
        contentSide: JSON.stringify(contentSide),
        settings: settings,
      }
    );

    setSource((prev) => prev + " ");
  }, [contentMain, contentSide, settings]);

  return (
    <div className="w-full grid grid-cols-3 space-x-10">
      <div className="flex flex-col space-y-5 col-span-2">
        <div className="flex justify-between items-center">
          <div className="flex space-x-3 items-center">
            <ArrowLeft
              className="w-6 h-6 cursor-pointer hover:text-gray-500 transition"
              onClick={() => history.back()}
            />
            <Input
              className="w-52 bg-[#f6f6f6] text-lg border-none hover:bg-gray-300 transition"
              value={title}
              onChange={(e) => onChangeTitle(e.target.value)}
              onKeyDown={(e) => handleEditTitle(e.code)}
            />
          </div>
          <div className="flex items-center justify-center space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button type="button" size={"icon"} variant={"ghost"}>
                    <HelpCircle className="text-gray-500 cursor-pointer" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Nothing yet</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <SnapshotModal
                    ButtonIcon={BookMarked}
                    title="Create"
                    buttonLabel="Create new"
                    label="Create your snapshot here. Click create when you're done with naming your snapshot."
                    size="icon"
                    actionWithoutId={handleCreateSnapshot}
                    clasName="text-gray-500 cursor-pointer hover:text-emerald-500"
                    variant="ghost"
                    isPending={isCreatePending}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create a snapshot with your current content</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    size={"icon"}
                    variant={"ghost"}
                    onClick={() => onChangeSettings('isSplit', false)}
                  >
                    <PanelTop
                      className={cn(
                        "text-gray-500 cursor-pointer",
                        !settings.isSplit && "text-emerald-500"
                      )}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Single layout</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    size={"icon"}
                    variant={"ghost"}
                    onClick={() => onChangeSettings('isSplit', true)}
                  >
                    <PanelLeft
                      className={cn(
                        "text-gray-500 cursor-pointer",
                        settings.isSplit && "text-emerald-500"
                      )}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Split layout</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="col-span-2">          
          {settings.isSplit ? (
            <ResizablePanelGroup
              direction="horizontal"
              className="w-full"
            >
              <ResizablePanel defaultSize={30} minSize={30}>
                <div className="pr-2 w-full">
                  <NovelEditor content={contentSide} onChange={onChangeContentSide} />
                </div>
              </ResizablePanel>  
              <ResizableHandle />
              <ResizablePanel defaultSize={70} minSize={30}>
                <div className={cn("w-full", settings.layout === 'twoCol' && "pl-2")}>
                  <NovelEditor content={contentMain} onChange={onChangeContentMain} />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          ) : (
            <NovelEditor content={contentMain} onChange={onChangeContentMain} />
          )}
        </div>
      </div>

      <div className="flex flex-col col-span-1 space-y-2">
        <div className="sticky top-0">
          <div className="text-sm font-bold text-black/70 pt-1">Preview</div>

          <div className="py-2">
            <div
              ref={scaledWrapper}
              className="relative rounded-sm overflow-hidden cursor-pointer bg-white"
              style={{
                height: `${currHeight}px`,
              }}
            >
              {isIframeloading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <RotateCw className="mr-2 h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              )}
              <iframe
                ref={scaledContent}
                src={source}
                onLoad={() => setIsIframeloading(false)}
                title="Preview"
                className="border-none overflow-hidden h-[1102px] w-[816px] origin-top-left"
              >
              </iframe>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-black/70 pr-2">Design</span>
            {designTemplates.map((t, i) => (
              <Button 
                variant={settings.template === t.template ? "default" : "outline"} 
                size={"sm"} key={i}
                onClick={() => onChangeSettings("template", t.template)}  
              >
                {t.template}
              </Button>
            ))}
          </div>

          <span className="text-sm font-bold text-black/70">Pro tip</span>

          <p className="text-muted-foreground text-sm">
            Type &apos;/ &apos; to quickly search and apply styles
          </p>
        </div>
      </div>
    </div>
  );
}

export default Editor;