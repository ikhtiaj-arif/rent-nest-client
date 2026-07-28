"use server";

import { cookies } from "next/headers";
import { handleApiError } from "./hadleApiError";
 

export const getNewAccessToken = async () => {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return {
        success: false,
        statusCode: 401,
        message: "Refresh token not found!",
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        statusCode: result.statusCode ?? res.status,
        message: result.message ?? "Failed to refresh token",
      };
    }

    return {
      success: true,
      statusCode: res.status,
      message: "Token refreshed successfully",
      data: result.data,
    };


  } catch (error) {
    return handleApiError(error);
  }
};