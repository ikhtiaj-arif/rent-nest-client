"use client";

import { Eye, EyeOff, Lock } from "lucide-react";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { initialAuthState } from "@/lib/types";
import { changePasswordAction } from "../_actions/userAction";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ChangePasswordCard() {
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [state, formAction, pending] = useActionState(
        changePasswordAction,
        initialAuthState
    );
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const passwordMismatch =
        confirmPassword.length > 0 && newPassword !== confirmPassword;

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            toast.success(state.message);
            startTransition(() => {

                setOpen(false);
            });
        } else {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5" />
                        Change Password
                    </CardTitle>

                    <CardDescription>
                        Keep your account secure by updating your password regularly.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Button onClick={() => setOpen(true)}>
                        Change Password
                    </Button>
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>

                        <DialogDescription>
                            Enter your current password and choose a new one.
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        action={formAction}
                        className="space-y-5"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">
                                Current Password
                            </Label>

                            <div className="relative">
                                <Input
                                    id="currentPassword"
                                    name="currentPassword"
                                    type={showPassword.current ? "text" : "password"}
                                    required
                                    className="pr-10"
                                />

                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
                                    onClick={() =>
                                        setShowPassword((prev) => ({
                                            ...prev,
                                            current: !prev.current,
                                        }))
                                    }
                                >
                                    {showPassword.current ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="newPassword">
                                New Password
                            </Label>

                            <div className="relative">
                                <Input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showPassword.new ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="pr-10"
                                />

                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
                                    onClick={() =>
                                        setShowPassword((prev) => ({
                                            ...prev,
                                            new: !prev.new,
                                        }))
                                    }
                                >
                                    {showPassword.new ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                                Confirm Password
                            </Label>

                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showPassword.confirm ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="pr-10"
                                />



                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
                                    onClick={() =>
                                        setShowPassword((prev) => ({
                                            ...prev,
                                            confirm: !prev.confirm,
                                        }))
                                    }
                                >
                                    {showPassword.confirm ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                            {passwordMismatch && (
                                <div> <p className="text-sm text-destructive">
                                    Passwords do not match.
                                </p></div>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={pending}
                            className="w-full"
                        >
                            {pending ? "Updating..." : "Update Password"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}