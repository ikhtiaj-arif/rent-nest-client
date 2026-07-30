"use server";

import { revalidateTag } from "next/cache";

import { AuthState } from "@/lib/types";
import { isAccessTokenExist } from "@/service/refreshToken";


export const getAllUsers = async ({
  query,
}: {
  query?: Record<string, string | string[] | undefined>;
}) => {
  const params = new URLSearchParams();

  if (query?.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }

  if (query?.role) {
    params.set("role", query.role as string);
  }

  if (query?.status) {
    params.set("status", query.status as string);
  }

  if (query?.page) {
    params.set("page", query.page as string);
  }

  if (query?.limit) {
    params.set("limit", query.limit as string);
  }

  if (query?.sort) {
    params.set("sort", query.sort as string);
  }

  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    return {
      success: false,
      statusCode: 403,
      message: "User not logged in.",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/users?${params.toString()}`,
    {
      cache: "no-store",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    }
  );

  return res.json();
};



export const getAllRentals = async ({
  query,
}: {
  query?: Record<string, string | string[] | undefined>;
}) => {
  const params = new URLSearchParams();

  if (query?.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }

  if (query?.landlordId) {
    params.set("landlordId", query.landlordId as string);
  }

  if (query?.city) {
    params.set("city", query.city as string);
  }

  if (query?.page) {
    params.set("page", query.page as string);
  }

  if (query?.limit) {
    params.set("limit", query.limit as string);
  }

  if (query?.sort) {
    params.set("sort", query.sort as string);
  }

  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    return {
      success: false,
      statusCode: 403,
      message: "User not logged in.",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/rentals?${params.toString()}`,
    {
      cache: "no-store",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    }
  );

  return res.json();
};


export const updateUserStatus = async (
  userId: string,
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> => {
  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    return {
      success: false,
      statusCode: 403,
      message: "User not logged in.",
    };
  }

  const payload = {
    status: formData.get("status"),
    role: formData.get("role"),
  };

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("users", {
      expire: 0,
    });
  }

  return result;
};