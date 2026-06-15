import { ChangeEvent, useId, useState } from "react";
import { Image, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type ImageUploaderProps = {
  value: string[];
  onChange: (images: string[]) => void;
  label?: string;
};

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function ImageUploader({ value, onChange, label = "Upload images" }: ImageUploaderProps) {
  const id = useId();
  const [loading, setLoading] = useState(false);

  const handleFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.currentTarget.files || []);
    if (!files.length) return;

    setLoading(true);
    try {
      const nextImages = await Promise.all(files.map(fileToDataUrl));
      onChange([...value, ...nextImages]);
    } finally {
      setLoading(false);
      event.currentTarget.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 rounded-xl border border-dashed border-border bg-secondary/30 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 font-medium">
            <Image className="h-4 w-4" /> {label}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Upload one or more images. Preview appears below.
          </p>
        </div>
        <Button type="button" variant="outline" asChild disabled={loading}>
          <label htmlFor={id} className="cursor-pointer">
            {loading ? "Uploading..." : "Choose images"}
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

      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {value.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="relative overflow-hidden rounded-lg border bg-background"
            >
              <img src={image} alt="" className="h-28 w-full object-cover" />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 h-7 w-7"
                onClick={() => onChange(value.filter((_, imageIndex) => imageIndex !== index))}
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
