"use client"

import { Button, buttonVariants } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Separator } from "@/components/ui/Separator";
import { Slider } from "@/components/ui/Slider";
import { useUpdateSnapshotSettings } from "@/lib/client/queries";
import { columnsLayout, defaultColors, designTemplates, fontSize, spacingSize, titleAlignment } from "@/lib/const";
import { cn } from "@/lib/utils";
import { Settings, Snapshot } from "@prisma/client";
import { Check, Columns2, PanelLeft, PanelRight, RotateCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

interface DesignerProps {
  snapshot: Snapshot;
  settings: Settings;
  setSettings: (field: string, value: string | number) => void
}

export default function Designer ({ snapshot, settings, setSettings }: DesignerProps) {
  const router = useRouter()
  const scaledContentDesigner = useRef<HTMLIFrameElement | null>(null);
  const [currHeight, setCurrHeight] = useState<number>(0);
  const [isIframeloading, setIsIframeloading] = useState<boolean>(true);
  const [source, setSource] = useState<string>(
    `/html?cv=${snapshot.cvId}` +
      (!!snapshot.id ? `&snapshot=${snapshot.id}` : "")
  );
  const { mutate: updateContent, isPending, isSuccess } = useUpdateSnapshotSettings()
  const pdfLink = `http://localhost:3000/api/cv/pdf?cv=${snapshot.cvId}` + (!!snapshot.id ? `&snapshot=${snapshot.id}` : "")

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
    updateContent({
      cvId: snapshot.cvId,
      snapshotId: snapshot.id,
      settings: settings,
    });

    setSource((prev) => prev + " ");
  }, [settings]);

  return (
    <div className="grid grid-cols-5 space-x-5">
      <div className="col-span-4">
        <div className="flex flex-wrap items-center gap-2 pb-5">
          <span className="text-sm font-bold text-black/70 pr-2 uppercase">
            Design
          </span>
          {designTemplates.map((t, i) => (
            <Button 
              variant={settings.template === t.template ? "default" : "outline"} 
              size={"sm"} key={i}
              onClick={() => setSettings("template", t.template)}  
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
          {isIframeloading && (
            <div className="w-full h-[600px] flex items-center justify-center">
              <RotateCw className="mr-2 h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}
          <iframe
            ref={scaledContentDesigner}
            src={source}
            onLoad={() => setIsIframeloading(false)}
            title="Preview"
            className="border-none overflow-hidden h-[1102px] w-[816px] origin-top-left"
          ></iframe>
        </div>
      </div>
      <div className="col-span-1 relative">
        <a 
          href={pdfLink} 
          // target="_blank"
          download="generated_pdf.pdf" 
          className={cn("w-full mb-4", buttonVariants())}
        >
          PDF Downloads
        </a>
        {/* <Button className="w-full mb-4" disabled >PDF Downloads</Button> */}
        <div className="rounded-sm sticky bg-white top-0 p-4">
          <div className="flex flex-col space-y-2">
            <Label className="uppercase font-bold text-muted-foreground">
              Title alignment
            </Label>

            <div className="flex flex-wrap items-center gap-2 pb-5">
              {titleAlignment.map((t, i) => (
                <Button 
                  key={i} 
                  size={"sm"} 
                  variant={settings.titleAlignment === t.value ? "default" : "outline"} 
                  onClick={() => {
                    setSettings("titleAlignment", t.value)
                  }}
                >
                  {t.alignment}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex flex-col space-y-2 py-3">
            <Label className="uppercase font-bold text-muted-foreground">
              Colour
            </Label>

            <div className="flex gap-2 flex-wrap py-1">
              {defaultColors.map((c, i) => (
                <div
                  onClick={() => setSettings("color", c)}
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
                      settings.color === c ? "block" : "hidden"
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex flex-col space-y-2 py-3">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="fontSize"
                className="uppercase font-bold text-muted-foreground"
              >
                Font size
              </Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {fontSize.indexOf(settings.fontSize)}
              </span>
            </div>

            <div className="">
              <Slider
                id="fontSize"
                max={fontSize.length -1}
                min={0}
                defaultValue={[fontSize.indexOf(settings.fontSize)]}
                step={1}
                onValueChange={(val) => setSettings("fontSize", fontSize[val[0]])}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                aria-label="FontSize"
              />
            </div>
          </div>

          <Separator />

          <div className="flex flex-col space-y-2 pt-3">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="spacing"
                className="uppercase font-bold text-muted-foreground"
              >
                Spacing
              </Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {spacingSize.indexOf(settings.spacing)}
              </span>
            </div>

            <div className="">
              <Slider
                id="spacing"
                max={spacingSize.length -1}
                min={0}
                defaultValue={[spacingSize.indexOf(settings.spacing)]}
                step={1}
                onValueChange={(val) => setSettings("spacing",spacingSize[val[0]])}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                aria-label="Spacing"
              />
            </div>

            {settings.isSplit && (
              <>
                <Separator />
              
                <div className="flex flex-col space-y-2 pt-3">
                  <Label className="uppercase font-bold text-muted-foreground">
                    Columns layout
                  </Label>
      
                  <div className="flex flex-wrap items-center gap-2 pb-5">
                    {columnsLayout.map((c, i) => (
                      <Button 
                        size={"icon"} 
                        variant={settings.layout === c.value ? "default" : "outline"} 
                        onClick={() => setSettings("layout", c.value)}
                      >
                        <c.icon />
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};