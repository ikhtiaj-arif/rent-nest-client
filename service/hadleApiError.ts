import { AuthState } from "@/lib/types";

export const handleApiError = (error: unknown): AuthState => {
  if (error instanceof Error) {
    return {
      success: false,
      statusCode: 500,
      message: error.message,
    };
  }

  return {
    success: false,
    statusCode: 500,
    message: "Something went wrong. Please try again.",
  };
};