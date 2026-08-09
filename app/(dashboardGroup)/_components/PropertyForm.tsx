"use client";

import { Badge, Loader2, PencilIcon, Plus, PlusIcon, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "sonner";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Property, initialAuthState } from "@/lib/types";
import { createProperty, updateProperty } from "../_actions/landlordActions";
import Image from "next/image";

interface Props {
    mode: "create" | "edit";
    property?: Property;
    onSuccess?: () => void;
}

export default function PropertyForm({
    mode,
    property,
}: Props) {
    const action =
        mode === "edit" && property
            ? updateProperty.bind(null, property.id)
            // ? updateProperty
            : createProperty;

    const [state, formAction, pending] = useActionState(
        action,
        initialAuthState
    );
    const [open, setOpen] = useState(false);

    const router = useRouter();

    const [images, setImages] = useState<
        {
            file: File;
            preview: string;
            isPrimary: boolean;
        }[]
    >([]);

    useEffect(() => {
        if (!state || (state.statusCode === 0 && state.message === "")) return;

        if (state.success) {
            toast.success(
                state.message ||
                (mode === "create"
                    ? "Property created successfully."
                    : "Property updated successfully.")
            );
            startTransition(() => {
                setOpen(false);
                setImages([]);
                router.refresh();
            });

        } else {
            toast.error(state.message || "Something went wrong");
        }
    }, [state, mode]);




    const MAX_IMAGE_SIZE = 1024 * 1024; // 1MB

   const handleImagesChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const files = Array.from(e.target.files ?? []);

  if (!files.length) return;

  const validFiles = files.filter((file) => {
    if (file.size > MAX_IMAGE_SIZE) {
      toast.error(
        `${file.name} exceeds the 1MB limit. Please upload a smaller image.`
      );
      return false;
    }

    return true;
  });

  if (!validFiles.length) return;

  const mapped = validFiles.map((file) => ({
    file,
    preview: URL.createObjectURL(file),
    isPrimary: false,
  }));

  setImages((prev) => {
    const updated = [...prev, ...mapped];

    if (!updated.some((img) => img.isPrimary) && updated.length > 0) {
      updated[0].isPrimary = true;
    }

    return updated;
  });
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




    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {
                    mode === "edit" ? (
                        <Button variant="outline" size="sm">
                            <PencilIcon data-icon="inline-start" />
                            Edit
                        </Button>
                    ) : (
                        <Button>
                            <PlusIcon data-icon="inline-start" />
                            Create Property
                        </Button>
                    )
                }
            </DialogTrigger>
            <DialogContent className="
                                        w-[95vw]
                                        max-w-5xl
                                        h-[92vh]
                                        p-0
                                        overflow-hidden
                                        rounded-2xl
                                    ">
                <DialogHeader className="sticky top-0 z-20 border-b bg-background px-8 py-5">
                    <DialogTitle className="text-2xl font-bold">
                        {mode === "edit" ? "Edit Property" : "Create Property"}
                    </DialogTitle>
                </DialogHeader>
                <form
                    action={formAction}

                    className="
                                flex-1
                                overflow-y-auto
                                px-8
                                py-6
                                space-y-8
                            "
                >
                    {/* Property Details */}

                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Property Details
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="grid gap-6 md:grid-cols-2">

                            <div className="space-y-2 md:col-span-2">
                                <Label>Title</Label>

                                <Input
                                    name="title"
                                    defaultValue={property?.title}
                                    required
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label>Description</Label>

                                <Textarea
                                    name="description"
                                    defaultValue={property?.description ?? ""}
                                    className="min-h-36"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>City</Label>

                                <Input
                                    name="city"
                                    defaultValue={property?.city}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Address</Label>

                                <Input
                                    name="address"
                                    defaultValue={property?.address ?? ""}
                                    required
                                />
                            </div>

                        </CardContent>
                    </Card>

                    {/* Features */}

                    <Card>

                        <CardHeader>
                            <CardTitle>
                                Property Features
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="grid gap-6 md:grid-cols-4">

                            <div className="space-y-2">
                                <Label>Price</Label>

                                <Input
                                    name="price"
                                    type="number"
                                    defaultValue={property?.price}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Bedrooms</Label>

                                <Input
                                    name="bedrooms"
                                    type="number"
                                    defaultValue={property?.bedrooms ?? ""}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Bathrooms</Label>

                                <Input
                                    name="bathrooms"
                                    type="number"
                                    defaultValue={property?.bathrooms ?? ""}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Area (sqft)</Label>

                                <Input
                                    name="area"
                                    type="number"
                                    defaultValue={property?.area ?? ""}
                                    required
                                />
                            </div>

                        </CardContent>

                    </Card>

                    {/* Category */}

                    <Card>

                        <CardHeader>
                            <CardTitle>
                                Category
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="grid gap-6 md:grid-cols-2">

                            <div className="space-y-2">
                                <Label>Category Name</Label>

                                <Input
                                    name="categoryName"
                                    defaultValue={property?.category?.name}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Category Description</Label>

                                <Input
                                    name="categoryDescription"
                                    defaultValue={property?.category?.description}
                                    required
                                />
                            </div>

                        </CardContent>

                    </Card>

                    {/* Availability */}

                    <Card>

                        <CardHeader>
                            <CardTitle>
                                Availability
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-6">

                            <div className="grid gap-6 md:grid-cols-2">

                                <div className="space-y-2">
                                    <Label>
                                        Available From
                                    </Label>

                                    <Input
                                        type="date"
                                        name="availableFrom"
                                        defaultValue={
                                            property?.availableFrom?.split("T")[0]
                                        }
                                        required
                                    />
                                </div>

                            </div>

                            <div className="flex gap-8">

                                <Label className="flex items-center gap-2">
                                    <Checkbox
                                        name="available"
                                        defaultChecked={
                                            property ? property.isAvailable : true
                                        }
                                    />

                                    Available
                                </Label>

                                <Label className="flex items-center gap-2">
                                    <Checkbox
                                        name="furnished"
                                        defaultChecked={
                                            property?.furnished
                                        }
                                    />

                                    Furnished
                                </Label>

                            </div>

                        </CardContent>

                    </Card>

                    {/* Images */}
                    <Card>

                        <CardHeader>

                            <CardTitle>
                                Property Images
                            </CardTitle>

                            <CardDescription>
                                Upload high-quality photos. Select one as the cover image.
                            </CardDescription>

                        </CardHeader>

                        <CardContent className="space-y-5">

                            {mode === "edit" && property?.images && property.images.length > 0 && (
                                <div className="space-y-3">
                                    <p className="text-sm font-medium">
                                        Current Photos
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                        {property.images.map((image) => (
                                            <div
                                                key={image.id}
                                                className="group relative overflow-hidden rounded-xl border"
                                            >
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={image.url}
                                                    alt=""
                                                    className="aspect-square w-full object-cover"
                                                />

                                                {image.isPrimary && (
                                                    <Badge className="absolute left-2 top-2">
                                                        Cover
                                                    </Badge>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-xs text-muted-foreground">
                                        Replacing photos on an existing listing isn&apos;t
                                        supported yet — uploads below only apply when
                                        creating a new property.
                                    </p>
                                </div>
                            )}

                            <Label
                                htmlFor="images"
                                className={`flex h-44 flex-col items-center justify-center rounded-xl border-2 border-dashed transition ${mode === "edit"
                                    ? "cursor-not-allowed opacity-50"
                                    : "cursor-pointer hover:border-primary"
                                    }`}
                            >
                                <UploadCloud className="mb-3 h-8 w-8" />

                                <p className="font-medium">
                                    Upload Images
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    JPG, PNG, WEBP • Max 1MB per image
                                </p>
                            </Label>

                            <Input
                                id="images"
                                name="images"
                                type="file"
                                multiple
                                disabled={mode === "edit"}
                                accept="image/*"
                                className="hidden"
                                onChange={handleImagesChange}
                            />

                            {images.length > 0 && (

                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">

                                    {images.map((image, index) => (

                                        <div
                                            key={index}
                                            className="group relative overflow-hidden rounded-xl border"
                                        >

                                            <Image
                                                src={image.preview}
                                                alt={`Property image ${index + 1}`}
                                                fill
                                                unoptimized
                                                className="rounded-xl object-cover"
                                            />

                                            {image.isPrimary && (
                                                <Badge className="absolute left-2 top-2">
                                                    Cover
                                                </Badge>
                                            )}

                                            <div className="absolute inset-x-0 bottom-0 flex gap-2 bg-black/60 p-2 opacity-0 transition group-hover:opacity-100">

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
                                        className="flex aspect-square cursor-pointer items-center justify-center rounded-xl border-2 border-dashed hover:border-primary transition"
                                    >
                                        <Plus className="h-8 w-8" />
                                    </Label>

                                </div>

                            )}

                        </CardContent>

                    </Card>

                    <div className="flex justify-center mt-2 w-full">

                        <Button
                            type="submit"
                            // size="default"
                            disabled={pending}
                            className="w-full md:w-1/2"
                        >
                            {pending && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}

                            {mode === "create"
                                ? "Create Property"
                                : "Save Changes"}
                        </Button>

                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}