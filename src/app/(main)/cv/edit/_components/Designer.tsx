"use client"

import { Button, buttonVariants } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Separator } from "@/components/ui/Separator";
import { Slider } from "@/components/ui/Slider";
import { toast } from "@/hooks/use-toast";
import { defaultColors, designTemplates, titleAlignment } from "@/lib/const";
import useSnapshotContent from "@/lib/store";
import { cn } from "@/lib/utils";
import { SnapshotUpdateRequest } from "@/lib/validators/snapshot";
import { Snapshot } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

interface DesignerProps {
  snapshot: Snapshot;
}

export default function Designer ({ snapshot }: DesignerProps) {
  const router = useRouter()
  const store = useSnapshotContent()
  const scaledContentDesigner = useRef<HTMLIFrameElement | null>(null);
  const [currHeight, setCurrHeight] = useState<number>(0);
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
        settings: store.settings,
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
  const scaledWrapperDesigner = useCallback((node: HTMLDivElement) => {
    if (node !== null && scaledContentDesigner.current) {
      // Reports changes to the dimensions of an Element's content
      const resizeObserver = new ResizeObserver(() => {
        // Do the logic when the size of the element changes
        if (node && scaledContentDesigner.current) {
          applyScaling(node, scaledContentDesigner.current);
        }
      });
      resizeObserver.observe(node);
    }
  }, []);

  useEffect(() => {
    updateContent();
  }, [store.settings]);

  return (
    <div className="grid grid-cols-5 space-x-5">
      <div className="col-span-4">
        <div className="flex flex-wrap items-center gap-2 pb-5">
          <span className="text-sm font-bold text-black/70 pr-2 uppercase">
            Design
          </span>
          {designTemplates.map((t, i) => (
            <Button 
              variant={store.settings.template === t.template ? "default" : "outline"} 
              size={"sm"} key={i}
              onClick={() => store.setSettings("template", t.template)}  
            >
              {t.template}
            </Button>
          ))}
        </div>

        <div
          ref={scaledWrapperDesigner}
          className="relative bg-white rounded-sm overflow-hidden cursor-pointer"
          style={{
            height: `${currHeight}px`,
          }}
        >
          <iframe
            ref={scaledContentDesigner}
            src={source}
            title="Preview"
            className="border-none overflow-hidden h-[1102px] w-[816px] origin-top-left"
          ></iframe>
        </div>
      </div>
      <div className="col-span-1 bg-white p-4 rounded-sm">
        <Button className="w-full mb-5">PDF Downloads</Button>
        <Separator />
        <div className="flex flex-col space-y-2 pt-3">
          <Label className="uppercase font-bold text-muted-foreground">
            Title alignment
          </Label>

          <div className="flex flex-wrap items-center gap-2 pb-5">
            {titleAlignment.map((t, i) => (
              <Button 
                key={i} 
                size={"sm"} 
                variant={store.settings.titleAlignment === t.value ? "default" : "outline"} 
                onClick={() => {
                  store.setSettings("titleAlignment", t.value)
                  console.log(store.settings)
                }}
              >
                {t.value}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-2 pt-3">
          <Label className="uppercase font-bold text-muted-foreground">
            Colour
          </Label>

          <div className="flex gap-2 flex-wrap">
            {defaultColors.map((c, i) => (
              <div
                onClick={() => store.setSettings("color", c)}
                key={i}
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "cursor-pointer aspect-square relative"
                )}
                style={{ backgroundColor: c }}
              >
                <Check
                  className={cn(
                    "w-6 h-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                    store.settings.color === c ? "block" : "hidden"
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-2 pt-3">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="fontSize"
              className="uppercase font-bold text-muted-foreground"
            >
              Font size
            </Label>
            <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
              {store.settings.fontSize}
            </span>
          </div>

          <div className="py-3">
            <Slider
              id="fontSize"
              max={15}
              min={10}
              defaultValue={[store.settings.fontSize]}
              step={1}
              onValueChange={(val) => store.setSettings("fontSize", val[0])}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="FontSize"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2 pt-3">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="spacing"
              className="uppercase font-bold text-muted-foreground"
            >
              Spacing
            </Label>
            <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
              {store.settings.spacing}
            </span>
          </div>

          <div className="py-3">
            <Slider
              id="spacing"
              max={5}
              min={1}
              defaultValue={[store.settings.spacing]}
              step={1}
              onValueChange={(val) => store.setSettings("spacing", val[0])}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Spacing"
            />
          </div>
        </div>
      </div>
    </div>
  );
};