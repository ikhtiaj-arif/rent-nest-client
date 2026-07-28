"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { loginAction } from "../_actions/authActions"



const LoginForm = () => {
    const [state, action, pending] = useActionState(loginAction, false)
    useEffect(() => {
        if (!state) return

        if (state.success) {
            toast.success(state.message || "Login Successful!")
            // router.push("/dashboard")
        }
        if (!state.success) {

            toast.error(state.message || "Login Failed!")
        }
    }, [state])

    return (
        <form action={action}>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input name="email" type="email" placeholder="Enter Your Email" defaultValue={'admin@example.com'} required />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                            href="#"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <Input name="password" type="password" placeholder="Enter Your Password" defaultValue={'SuperSecurePassword123!'} />
                </div>
                <Button type="submit" className="w-full">
                    {pending ? "Submitting..." : "Login"}
                </Button>
            </div>
        </form>
    )
}

export default LoginForm