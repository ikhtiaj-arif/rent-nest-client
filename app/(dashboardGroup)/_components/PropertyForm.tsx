"use client";

import { Badge, Loader2, PencilIcon, Plus, PlusIcon, UploadCloud } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

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

    const [images, setImages] = useState<
        {
            file: File;
            preview: string;
            isPrimary: boolean;
        }[]
    >([]);

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(
                state.message ??
                (mode === "create"
                    ? "Property created successfully."
                    : "Property updated successfully.")
            );
        } else if (state.message) {
            toast.error(state.message);
        }
    }, [state, mode]);


    const handleImagesChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = Array.from(e.target.files ?? []);

        if (!files.length) return;

        const mapped = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            isPrimary: false,
        }));

        setImages((prev) => {
            const updated = [...prev, ...mapped];

            if (!updated.some((img) => img.isPrimary)) {
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
    const [open, setOpen] = useState(false);



    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message || (mode === "edit" ? "Post updated successfully" : "Post created successfully"));
            // eslint-disable-next-line react-hooks/set-state-in-effect -- closing the dialog is the intended reaction to the server action's result, not a render loop
            setOpen(false);
        } else {
            toast.error(state.message || "Something went wrong");
        }
    }, [state, mode]);

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
            <DialogContent className="  w-[95vw]
                                        max-w-6xl
                                        max-h-[90vh]
                                        
                                        p-0">
                <DialogHeader className="border-b px-8 py-6">
                    <DialogTitle className="text-2xl">
                        {mode === "edit" ? "Edit Property" : "Create Property"}
                    </DialogTitle>
                </DialogHeader>
                <form
                    action={formAction}
                    encType="multipart/form-data"
                    className="max-h-[calc(90vh-90px)] overflow-y-auto px-8 py-6"
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
                                    // defaultValue={property?.description}
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
                                    // defaultValue={property?.address}
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
                                    // defaultValue={property?.bedrooms}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Bathrooms</Label>

                                <Input
                                    name="bathrooms"
                                    type="number"
                                    // defaultValue={property?.bathrooms}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Area (sqft)</Label>

                                <Input
                                    name="area"
                                    type="number"
                                    defaultValue={property?.area}
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
                                    // defaultChecked={
                                    //     property?.available ?? true
                                    // }
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

                            <Label
                                htmlFor="images"
                                className="flex h-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed hover:border-primary transition"
                            >
                                <UploadCloud className="mb-3 h-8 w-8" />

                                <p className="font-medium">
                                    Upload Images
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    JPG, PNG, WEBP
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
                                            key={index}
                                            className="group relative overflow-hidden rounded-xl border"
                                        >

                                            <img
                                                src={image.preview}
                                                alt=""
                                                className="aspect-square w-full object-cover"
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

                    <div className="flex justify-end">

                        <Button
                            type="submit"
                            size="lg"
                            disabled={pending}
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