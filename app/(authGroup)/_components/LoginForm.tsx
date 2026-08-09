"use client";

import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { loginAction } from "../_actions/authActions";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initialAuthState } from "@/lib/types";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") ?? "";
    const [state, action, pending] = useActionState(loginAction.bind(null, redirectTo), initialAuthState);

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message || "Logged in successfully.");
        } else if (state.message) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <form action={action} className="space-y-4">
            {state?.message && !state.success && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{state.message}</span>
                </div>
            )}

            <div className="space-y-1.5">
                <Label htmlFor="email">Email address</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    className="h-10"
                />
            </div>

            <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                </div>

                <div className="relative">
                    <Input
                        id="password"
                        name="password"
                        required
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pr-10 h-10"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                        </span>
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-xs font-normal text-muted-foreground cursor-pointer">
                        Remember me for 30 days
                    </Label>
                </div>
            </div>

            <Button disabled={pending} className="h-11 w-full font-semibold">
                {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
            </Button>
        </form>
    );
}