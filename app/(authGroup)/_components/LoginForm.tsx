"use client";

import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { loginAction } from "../_actions/authActions";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initialAuthState } from "@/lib/types";
import { useSearchParams } from "next/navigation";

const demoCredentials = {
    admin: {
        email: "admin@example.com",
        password: "qwer1234",
    },
    tenant: {
        email: "tenant@example.com",
        password: "qwer1234",
    },
    landlord: {
        email: "alex@example.com",
        password: "qwer1234",
    },
};

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") ?? "";

    const [state, action, pending] = useActionState(
        loginAction.bind(null, redirectTo),
        initialAuthState
    );

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message || "Logged in successfully.");
        } else if (state.message) {
            toast.error(state.message);
        }
    }, [state]);

    const fillCredentials = (
        role: keyof typeof demoCredentials
    ) => {
        const credentials = demoCredentials[role];

        setEmail(credentials.email);
        setPassword(credentials.password);
    };

    return (
        <form action={action} className="space-y-4">
            {state?.message && !state.success && (
                <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs font-medium text-destructive">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{state.message}</span>
                </div>
            )}

            {/* Quick Login */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label className="text-xs text-muted-foreground">
                        Quick login
                    </Label>

                    <span className="text-[11px] text-muted-foreground">
                        Demo accounts
                    </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fillCredentials("admin")}
                        disabled={pending}
                    >
                        Admin
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fillCredentials("tenant")}
                        disabled={pending}
                    >
                        Tenant
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fillCredentials("landlord")}
                        disabled={pending}
                    >
                        Landlord
                    </Button>
                </div>
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="email">Email address</Label>

                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-10 pr-10"
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword((prev) => !prev)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}

                        <span className="sr-only">
                            {showPassword
                                ? "Hide password"
                                : "Show password"}
                        </span>
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-2">
                    <Checkbox id="remember" name="remember" />

                    <Label
                        htmlFor="remember"
                        className="cursor-pointer text-xs font-normal text-muted-foreground"
                    >
                        Remember me for 30 days
                    </Label>
                </div>
            </div>

            <Button
                type="submit"
                disabled={pending}
                className="h-11 w-full font-semibold"
            >
                {pending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}

                {pending ? "Signing in..." : "Sign In"}
            </Button>
        </form>
    );
}