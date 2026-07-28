"use client";

import { Building2, Eye, EyeOff, Loader2, User } from "lucide-react";
import { useActionState, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


import { toast } from "sonner";

import { registerAction } from "../_actions/authActions";



export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [state, action, pending] = useActionState(registerAction,
        {
            success: false,
            statusCode: 0,
            message: "",
        });

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message || "Registration successful. Please Login");
        } else {
            toast.error(state.message || "Registration failed.");
        }
    }, [state]);

    const passwordMismatch = useMemo(() => {
        if (!confirmPassword.length) return false;

        return password !== confirmPassword;
    }, [password, confirmPassword]);

    return (
        <form action={action} className="space-y-5">
            <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>

                <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>

                <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>

                <Input
                    id="phone"
                    name="phone"
                    placeholder="+8801XXXXXXXXX"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>

                <div className="relative">
                    <Input
                        id="password"
                        name="password"
                        required
                        type={showPassword ? "text" : "password"}
                        className="pr-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>

                <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    aria-invalid={passwordMismatch}
                />

                {passwordMismatch && (
                    <p className="text-sm text-destructive">
                        Passwords do not match.
                    </p>
                )}
            </div>

            <Button
                type="submit"
                className="h-11 w-full"
                disabled={pending || passwordMismatch}
            >
                {pending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}

                Create Account
            </Button>
        </form>
    );
}


<div className="space-y-3">
    <Label>I am registering as</Label>

    <RadioGroup
        defaultValue="tenant"
        className="grid grid-cols-2 gap-4"
    >
        <Label className="cursor-pointer rounded-xl border p-4 transition hover:bg-accent has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
            <RadioGroupItem value="tenant" className="sr-only" />

            <User className="mb-2 h-6 w-6 text-primary" />

            <p className="font-medium">Tenant</p>

            {/* <p className="text-xs text-muted-foreground">
              Rent properties
            </p> */}
        </Label>

        <Label className="cursor-pointer rounded-xl border p-4 transition hover:bg-accent has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
            <RadioGroupItem value="landlord" className="sr-only" />

            <Building2 className="mb-2 h-6 w-6 text-primary" />

            <p className="font-medium">Landlord</p>

            {/* <p className="text-xs text-muted-foreground">
              List properties
            </p> */}
        </Label>
    </RadioGroup>
</div>