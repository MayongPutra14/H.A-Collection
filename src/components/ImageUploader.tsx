import { ChangeEvent, useId, useState } from "react";
import { Image, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { validateImageFile, MAX_IMAGE_SIZE, ALLOWED_IMAGE_TYPES } from "@/api/storage";

type ImageUploaderProps = {
  files: File[];
  onChange: (files: File[]) => void;
  label?: string;
  existingUrls?: string[];
  onRemoveUrl?: (index: number) => void;
};

export function ImageUploader({
  files,
  onChange,
  label = "Upload images",
  existingUrls = [],
  onRemoveUrl,
}: ImageUploaderProps) {
  const id = useId();
  const [error, setError] = useState<string | null>(null);

  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.currentTarget.files || []);
    if (!selectedFiles.length) return;

    setError(null);

    const validFiles: File[] = [];
    for (const file of selectedFiles) {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setError(validation.error || "Invalid file");
        return;
      }
      validFiles.push(file);
    }

    onChange([...files, ...validFiles]);
    event.currentTarget.value = "";
  };

  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  const previewUrl = (file: File) => URL.createObjectURL(file);

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 rounded-xl border border-dashed border-border bg-secondary/30 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 font-medium">
            <Image className="h-4 w-4" /> {label}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Upload one or more images (max 2MB each). Images will be uploaded when you save.
          </p>
        </div>
        <Button type="button" variant="outline" asChild>
          <label htmlFor={id} className="cursor-pointer">
            Choose images
          </label>
        </Button>
        <input
          id={id}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFiles}
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {(files.length > 0 || existingUrls.length > 0) && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {existingUrls.map((url, index) => (
            <div
              key={`existing-${index}`}
              className="relative overflow-hidden rounded-lg border bg-background"
            >
              <img src={url} alt="" className="h-28 w-full object-cover" />
              {onRemoveUrl && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute right-2 top-2 h-7 w-7"
                  onClick={() => onRemoveUrl(index)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          ))}
          {files.map((file, index) => (
            <div
              key={`file-${index}`}
              className="relative overflow-hidden rounded-lg border bg-background"
            >
              <img
                src={previewUrl(file)}
                alt={file.name}
                className="h-28 w-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 h-7 w-7"
                onClick={() => removeFile(index)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}