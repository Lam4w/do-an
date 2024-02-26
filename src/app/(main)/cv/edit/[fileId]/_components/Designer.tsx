import { Button, buttonVariants } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Separator } from "@/components/ui/Separator";
import { Slider } from "@/components/ui/Slider";
import { defaultColors, designTemplate } from "@/lib/const";
import { cn } from "@/lib/utils";
import { Snapshot } from "@prisma/client";
import { Check } from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface DesignerProps {
  snapshot: Snapshot;
}

const Designer = ({ snapshot }: DesignerProps) => {
  const [selectedColour, setSelectedColour] = useState<string>("#222222");
  const scaledContentDesigner = useRef<HTMLIFrameElement | null>(null);
  const [currHeight, setCurrHeight] = useState<number>(0);
  const [source, setSource] = useState<string>(
    `/api/cv/html?cv=${snapshot.cvId}` +
      (!!snapshot.id ? `&snapshot=${snapshot.id}` : "")
  );
  const [fontSize, setFontSize] = useState(snapshot.settings.fontSize);
  const [spacing, setSpacing] = useState(snapshot.settings.spacing);

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

  return (
    <div className="grid grid-cols-5 space-x-5">
      <div className="col-span-4">
        <div className="flex flex-wrap items-center gap-2 pb-5">
          <span className="text-sm font-bold text-black/70 pr-2 uppercase">
            Design
          </span>
          {designTemplate.map((t, i) => (
            <Button variant={"outline"} size={"sm"} key={i}>
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

          <div className="flex">
            <Button size={"sm"} variant={"ghost"}>
              Left
            </Button>
            <Button size={"sm"} variant={"ghost"}>
              Center
            </Button>
            <Button size={"sm"} variant={"ghost"}>
              Right
            </Button>
          </div>
        </div>

        <div className="flex flex-col space-y-2 pt-3">
          <Label className="uppercase font-bold text-muted-foreground">
            Colour
          </Label>

          <div className="flex gap-2 flex-wrap">
            {defaultColors.map((c, i) => (
              <div
                onClick={() => setSelectedColour(c)}
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
                    selectedColour === c ? "block" : "hidden"
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
              {fontSize}
            </span>
          </div>

          <div className="py-3">
            <Slider
              id="fontSize"
              max={15}
              min={10}
              defaultValue={[fontSize]}
              step={1}
              onValueChange={(val) => setFontSize(val[0])}
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
              {spacing}
            </span>
          </div>

          <div className="py-3">
            <Slider
              id="spacing"
              max={5}
              min={1}
              defaultValue={[spacing]}
              step={1}
              onValueChange={(val) => setSpacing(val[0])}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Spacing"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Designer;
