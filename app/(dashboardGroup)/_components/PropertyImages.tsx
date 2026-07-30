"use client";

import { Plus, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImagePreview {
  file: File;
  preview: string;
  isPrimary: boolean;
}

export default function PropertyImages() {
  const [images, setImages] = useState<ImagePreview[]>([]);

  const handleImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files ?? []);

    if (!files.length) return;

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      isPrimary: false,
    }));

    setImages((prev) => {
      const updated = [...prev, ...newImages];

      if (!updated.some((img) => img.isPrimary) && updated.length > 0) {
        updated[0].isPrimary = true;
      }

      return updated;
    });

    // allow selecting same file again
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const updated = [...prev];

      URL.revokeObjectURL(updated[index].preview);

      const removedPrimary = updated[index].isPrimary;

      updated.splice(index, 1);

      if (removedPrimary && updated.length) {
        updated[0].isPrimary = true;
      }

      return updated;
    });
  };

  const setPrimary = (index: number) => {
    setImages((prev) =>
      prev.map((img, i) => ({
        ...img,
        isPrimary: i === index,
      }))
    );
  };

  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [images]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Images</CardTitle>

        <CardDescription>
          Upload one or more property photos.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Label
          htmlFor="images"
          className="flex h-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition hover:border-primary"
        >
          <UploadCloud className="mb-3 h-8 w-8" />

          <p className="font-medium">Upload Images</p>

          <p className="text-sm text-muted-foreground">
            JPG, PNG or WEBP
          </p>
        </Label>

        <Input
          id="images"
          name="images"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleImagesChange}
        />

        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {images.map((image, index) => (
              <div
                key={image.preview}
                className="group relative overflow-hidden rounded-xl border"
              >
                <img
                  src={image.preview}
                  alt="Property"
                  className="aspect-square w-full object-cover"
                />

                {image.isPrimary && (
                  <Badge className="absolute left-2 top-2">
                    Cover
                  </Badge>
                )}

                <div className="absolute inset-x-0 bottom-0 flex gap-2 bg-black/60 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                  {!image.isPrimary && (
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="flex-1"
                      onClick={() => setPrimary(index)}
                    >
                      Cover
                    </Button>
                  )}

                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => removeImage(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}

            <Label
              htmlFor="images"
              className="flex aspect-square cursor-pointer items-center justify-center rounded-xl border-2 border-dashed transition hover:border-primary"
            >
              <Plus className="h-8 w-8" />
            </Label>
          </div>
        )}
      </CardContent>
    </Card>
  );
}