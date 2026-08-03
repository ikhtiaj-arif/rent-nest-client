/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { initialAuthState } from "@/lib/types";
import { updateProfileAction } from "../_actions/userAction";

interface Props {
    user: any;
}

export default function EditProfileDialog({ user }: Props) {
    const router = useRouter();

    const [open, setOpen] = useState(false);

    const [state, formAction, pending] = useActionState(
        updateProfileAction,
        initialAuthState,
    );

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            toast.success(state.message);
            startTransition(() => {
                setOpen(false);
                router.refresh()
            })
        } else {
            // Previously this branch was silently dropped — a failed
            // update (e.g. validation error from the backend) gave the
            // user no feedback at all and just sat there.
            toast.error(state.message);
        }
    }, [state, router]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="outline">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>

                <form action={formAction} className="grid gap-5">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={user?.name}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            value={user?.email}
                            disabled
                        />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                defaultValue={user?.phone ?? ""}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>

                            {/* Replace this with Shadcn Select */}
                            <select
                                id="gender"
                                name="gender"
                                defaultValue={user?.gender ?? ""}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                <option value="">Select gender</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>

                            <Input
                                id="dateOfBirth"
                                type="date"
                                name="dateOfBirth"
                                defaultValue={
                                    user?.dateOfBirth
                                        ? user.dateOfBirth.slice(0, 10)
                                        : ""
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>

                            <Input
                                id="address"
                                name="address"
                                defaultValue={user?.address ?? ""}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>

                        <Textarea
                            id="bio"
                            rows={5}
                            name="bio"
                            defaultValue={user?.bio ?? ""}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={pending}
                    >
                        {pending ? "Saving..." : "Save Changes"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}