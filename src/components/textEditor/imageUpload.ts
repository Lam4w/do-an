import { useUploadThing, uploadFiles } from "@/lib/uploadthing";
import { createImageUpload } from "novel/plugins";
import { toast } from "sonner";

const onUpload = async (file: File) => {
  const files = [file]
  const res = await uploadFiles("media", {
    files,
    // input: {}, // will be typesafe to match the input set for `imageUploader` in your FileRouter
  });

  return res[0].url;
};

export const uploadFn = createImageUpload({
    onUpload,
    validateFn: (file) => {
        if (!file.type.includes("image/")) {
            toast.error("File type not supported.");
            return false;
        } else if (file.size / 1024 / 1024 > 20) {
            toast.error("File size too big (max 20MB).");
            return false;
        }
        return true;
    },
});