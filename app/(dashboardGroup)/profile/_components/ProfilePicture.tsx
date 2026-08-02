"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";

import {
    Camera,
    Loader2,
    User
} from "lucide-react";


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initialAuthState } from "@/lib/types";
import { toast } from "sonner";
import { uploadProfilePictureAction } from "../_actions/userAction";

interface ProfileCardProps {
    user: {
        name: string;
        email: string;
        phone: string | null;
        profilePicture: string | null;
        bio: string | null;
        gender: string | null;
        dateOfBirth: string | null;
        address: string | null;
        role: string;
        status: string;
        createdAt: string;
    };
}

export default function ProfilePicture({
    user,
}: ProfileCardProps) {
    const router = useRouter();

    const fileRef = useRef<HTMLInputElement>(null);

    const [isUploading, setUploading] = useState(false);

    const [state, formAction, pending] = useActionState(
        uploadProfilePictureAction,
        initialAuthState,
    );

    useEffect(() => {
        if (state.success) {
            toast.success(state.message || "Profile picture updated successfully.");
            router.refresh();
        } else if (state.message) {
            toast.error(state.message || "Failed to update profile picture.");
        }
    }, [state, router]);

    return (
        <div className="flex flex-col items-center gap-5 md:flex-row md:items-start">
            <form
                action={formAction}
                className="relative"
                onChange={(e) => {
                    setUploading(true);
                    e.currentTarget.requestSubmit();
                }}
            >
                <input
                    ref={fileRef}
                    type="file"
                    name="image"
                    accept="image/*"
                    hidden
                />

                <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="group relative"
                >
                    <Avatar className="h-28 w-28 border">
                        <AvatarImage src={user.profilePicture ?? ""} />

                        <AvatarFallback>
                            <User className="h-10 w-10 text-muted-foreground" />
                        </AvatarFallback>
                    </Avatar>

                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                        {pending ? (
                            <Loader2 className="h-6 w-6 animate-spin text-white" />
                        ) : (
                            <Camera className="h-6 w-6 text-white" />
                        )}
                    </div>
                </button>
            </form>

            {/* Remaining profile info... */}
        </div>
    );
}