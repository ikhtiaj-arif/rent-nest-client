"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
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
    const redirectTo = searchParams.get("redirect") ?? ""
    const [state, action, pending] = useActionState(loginAction.bind(null, redirectTo), initialAuthState)

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message);
        } else if (state.message) {
            // initialAuthState has success:false with no message on first
            // render — only toast once the user has actually submitted
            // and gotten a real result back.
            toast.error(state.message);
        }
    }, [state]);

    return (
        <form action={action} className="space-y-5">
            <div className="space-y-2">
                <Label>Email</Label>

                <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label>Password</Label>

                <div className="relative">
                    <Input
                        name="password"
                        required
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pr-10"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                    </button>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox id="remember" />

                <Label htmlFor="remember" className="text-sm font-normal">
                    Remember me
                </Label>
            </div>

            <Button disabled={pending} className="h-11 w-full">
                {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
            </Button>
        </form>
    );
}