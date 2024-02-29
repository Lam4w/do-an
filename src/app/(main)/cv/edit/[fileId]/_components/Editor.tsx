"use client";

import SnapshotModal from "@/components/main/CVModal";
import NovelEditor from "@/components/editor/NovelEditor";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { toast } from "@/hooks/use-toast";
import { designTemplate } from "@/lib/const";
import { cn } from "@/lib/utils";
import {
  SnapshotCreateRequest,
  SnapshotUpdateRequest,
} from "@/lib/validators/snapshot";
import "@/styles/editor.css";
import { Snapshot } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import {
  ArrowLeft,
  BookMarked,
  HelpCircle,
  PanelLeft,
  PanelTop,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface EditorProps {
  snapshot: Snapshot;
}

function Editor({ snapshot }: EditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState<string>(snapshot.title);
  const [isSplit, SetIsSplit] = useState<boolean>(false);
  const [currHeight, setCurrHeight] = useState<number>(0);
  const scaledContent = useRef<HTMLIFrameElement | null>(null);
  const [contentLeft, setContentLeft] = useState<any>(snapshot.content);
  const [contentRight, setContentRight] = useState<any>("");
  const debouncedValue = useDebounce(contentLeft, 0);
  const [source, setSource] = useState<string>(
    `/api/cv/html?cv=${snapshot.cvId}` +
      (!!snapshot.id ? `&snapshot=${snapshot.id}` : "")
  );

  const {
    mutate: updateContent,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async () => {
      const payload: SnapshotUpdateRequest = {
        cvId: snapshot.cvId,
        snapshotId: snapshot.id,
        title,
        content: contentLeft,
      };
      const { data } = await axios.patch("/api/cv", payload);

      setSource((prev) => prev + " ");

      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return router.push("/sign-in");
        }
      }

      toast({
        title: "There was an error",
        description: "Could not update your snapshot, please try again later.",
        variant: "destructive",
      });
    },
  });

  const { mutate: createSnapshot, isPending: isCreatePending } = useMutation({
    mutationFn: async (snapshotTitle: string) => {
      const payload: SnapshotCreateRequest = {
        cvId: snapshot.cvId,
        title: snapshotTitle,
        content: contentLeft,
      };
      const { data } = await axios.post("/api/user/cv/snapshot", payload);

      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "CV already exists",
            description: "Please choose a different snapshot name.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 422) {
          return toast({
            title: "Invalid CV name",
            description: "Please choose a different snapshot name.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 401) {
          return router.push("/sign-in");
        }
      }

      toast({
        title: "There was an error",
        description: "Could not create snapshot, please try again later.",
        variant: "destructive",
      });
    },
  });

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

  useEffect(() => {
    if (debouncedValue) {
      updateContent();
    }
  }, [debouncedValue]); // eslint-disable-line

  const handleEditTitle = (code: string) => {
    if (code === "Enter") {
      updateContent();
    }
  };

  return (
    <div className="w-full grid grid-cols-3 space-x-10">
      <div className="flex flex-col space-y-5 col-span-2">
        <div className="flex justify-between items-center">
          <div className="flex space-x-3 items-center">
            <ArrowLeft
              className="w-6 h-6 cursor-pointer hover:text-gray-500 transition"
              onClick={() => router.push("/dashboard")}
            />
            <Input
              className="w-52 bg-[#f6f6f6] text-lg border-none hover:bg-gray-300 transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
                    actionWithoutId={createSnapshot}
                    clasName="text-gray-500 cursor-pointer hover:text-emerald-500"
                    variant="ghost"
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
                    onClick={() => SetIsSplit(false)}
                  >
                    <PanelTop
                      className={cn(
                        "text-gray-500 cursor-pointer",
                        !isSplit && "text-emerald-500"
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
                    onClick={() => SetIsSplit(true)}
                  >
                    <PanelLeft
                      className={cn(
                        "text-gray-500 cursor-pointer",
                        isSplit && "text-emerald-500"
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
          <div
            className={cn(
              "grid",
              isSplit ? "grid-cols-2 space-x-3" : "grid-cols-1"
            )}
          >
            {/* <SyntaxHelper value={contentLeft} onChange={setContentLeft} /> */}
            <NovelEditor content={contentLeft} onChange={setContentLeft} />
            {isSplit && (
              // <SyntaxHelper value={contentRight} onChange={setContentRight} />
              <NovelEditor content={contentRight} onChange={setContentRight} />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col col-span-1 space-y-2">
        <div className="text-sm font-bold text-black/70">Preview</div>

        <div
          ref={scaledWrapper}
          className="relative rounded-sm overflow-hidden cursor-pointer"
          style={{
            height: `${currHeight}px`,
          }}
        >
          <iframe
            ref={scaledContent}
            src={source}
            title="Preview"
            className="border-none overflow-hidden h-[1102px] w-[816px] origin-top-left"
          ></iframe>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-black/70 pr-2">Design</span>
          {designTemplate.map((t, i) => (
            <Button variant={"outline"} size={"sm"} key={i}>
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
  );
}

export default Editor;
