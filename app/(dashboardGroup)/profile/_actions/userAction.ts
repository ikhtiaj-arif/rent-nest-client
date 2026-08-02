"use server";

import { cookies } from "next/headers";

import { AuthState } from "@/lib/types";
import { handleApiError } from "@/service/hadleApiError";

export const getProfileAction = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/user/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    return await res.json();
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateProfileAction = async (
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const payload: Record<string, string> = {};

    const name = formData.get("name")?.toString().trim();
    if (name) {
      payload.name = name;
    }

    const phone = formData.get("phone")?.toString().trim();
    if (phone) {
      payload.phone = phone;
    }

    const bio = formData.get("bio")?.toString().trim();
    if (bio) {
      payload.bio = bio;
    }

    const gender = formData.get("gender")?.toString().trim();
    if (gender) {
      payload.gender = gender;
    }

    const dateOfBirth = formData.get("dateOfBirth")?.toString().trim();
    if (dateOfBirth) {
      payload.dateOfBirth = dateOfBirth;
    }

    const address = formData.get("address")?.toString().trim();
    if (address) {
      payload.address = address;
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/user/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        statusCode: result.statusCode ?? res.status,
        message: result.message,
      };
    }

    return {
      success: true,
      statusCode: result.statusCode,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    return handleApiError(error);
  }
};

export const uploadProfilePictureAction = async (
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const body = new FormData();
    body.append("image", formData.get("image") as File);

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/user/profile-picture`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body,
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        statusCode: result.statusCode ?? res.status,
        message: result.message,
      };
    }

    return {
      success: true,
      statusCode: result.statusCode,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    return handleApiError(error);
  }
};

export const changePasswordAction = async (
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const payload = {
      currentPassword: formData.get("currentPassword"),
      newPassword: formData.get("newPassword"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/user/change-password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        statusCode: result.statusCode ?? res.status,
        message: result.message,
      };
    }

    return {
      success: true,
      statusCode: result.statusCode,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    return handleApiError(error);
  }
};

export const requestLandlordAction = async (
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const payload = {
      requestReason: formData.get("requestReason"),
    };

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/users/request-landlord`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        statusCode: result.statusCode ?? res.status,
        message: result.message,
      };
    }

    return {
      success: true,
      statusCode: result.statusCode,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    return handleApiError(error);
  }
};
