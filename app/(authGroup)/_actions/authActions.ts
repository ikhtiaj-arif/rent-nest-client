"use server";

import { AuthState } from "@/lib/types";
import { handleApiError } from "@/service/hadleApiError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

// type LoginState = {
//   success: true;
//   statusCode: number;
//   message: string;
//   data: {
//     accessToken: string;
//     refreshToken: string;
//   };
// };
type RegisterState = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: unknown;
};

export const loginAction = async (
  redirectTo: string,
  prevState: AuthState,
  formData: FormData,
) => {
  try {
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    // if backend returns an error
    if (!res.ok || !result.success) {
      return {
        success: false,
        statusCode: result.statusCode ?? res.status,
        message: result.message ?? "Login failed",
      };
    }

    const cookieStore = await cookies();
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;
    // if role not present
    if (!decodedToken?.role) {
      return {
        success: false,
        statusCode: 500,
        message: "Invalid authentication token",
      };
    }

    if (
      redirectTo &&
      typeof redirectTo === "string" &&
      redirectTo.startsWith("/") &&
      !redirectTo.startsWith("//")
    ) {
      redirect(redirectTo);
    }
    // console.log("decoded", decodedToken);
    if (decodedToken.role === "TENANT") {
      redirect("/dashboard");
    } else if (decodedToken.role === "ADMIN") {
      redirect("/admin-dashboard");
    } else if (decodedToken.role === "LANDLORD") {
      redirect("/landlord-dashboard");
    } else {
      redirect("/");
    }

  } catch (error) {
     if (isRedirectError(error)) {
    throw error;
  }
    return handleApiError(error);
  }

  //   return result;
};

export const registerAction = async (
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> => {
  try {
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      role: formData.get("role"),
    };

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        statusCode: result.statusCode ?? res.status,
        message: result.message ?? "Registration failed",
      };
    }

    return {
      success: true,
      statusCode: result.statusCode,
      message: result.message ?? "Registration successful",
      data: result.data,
    };
  } catch (error) {
    return handleApiError(error);
  }
};
