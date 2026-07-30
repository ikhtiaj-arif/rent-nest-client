"use server";

import { revalidateTag } from "next/cache";
 
import { AuthState } from "@/lib/types";
import { isAccessTokenExist } from "@/service/refreshToken";

export const createProperty = async (
  prevState: AuthState,
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

  const payload = new FormData();

  payload.append("title", formData.get("title") as string);
//   payload.append("description", formData.get("description") as string);
  payload.append("city", formData.get("city") as string);
//   payload.append("address", formData.get("address") as string);
  payload.append("price", formData.get("price") as string);
//   payload.append("bedrooms", formData.get("bedrooms") as string);
//   payload.append("bathrooms", formData.get("bathrooms") as string);
  payload.append("area", formData.get("area") as string);

  payload.append(
    "furnished",
    String(formData.get("furnished") === "on")
  );

  payload.append(
    "available",
    String(formData.get("available") === "on")
  );

  payload.append(
    "availableFrom",
    new Date(formData.get("availableFrom") as string).toISOString()
  );

  payload.append(
    "categoryName",
    formData.get("categoryName") as string
  );

  payload.append(
    "categoryDescription",
    formData.get("categoryDescription") as string
  );

  const images = formData.getAll("images") as File[];

  images.forEach((image) => {
    if (image.size > 0) {
      payload.append("images", image);
    }
  });

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/properties`,
    {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        // ❌ Do NOT set Content-Type.
        // fetch will automatically add the correct multipart boundary.
      },
      body: payload,
    }
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("properties", {
      expire: 0,
    });

    revalidateTag("filter-options", {
      expire: 0,
    });
  }

  return result;
};
export const updateProperty = async (
  prevState: AuthState,
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

  const payload = new FormData();

  payload.append("title", formData.get("title") as string);
  payload.append("description", formData.get("description") as string);
  payload.append("city", formData.get("city") as string);
  payload.append("address", formData.get("address") as string);
  payload.append("price", formData.get("price") as string);
  payload.append("bedrooms", formData.get("bedrooms") as string);
  payload.append("bathrooms", formData.get("bathrooms") as string);
  payload.append("area", formData.get("area") as string);

  payload.append(
    "furnished",
    String(formData.get("furnished") === "on")
  );

  payload.append(
    "available",
    String(formData.get("available") === "on")
  );

  payload.append(
    "availableFrom",
    new Date(formData.get("availableFrom") as string).toISOString()
  );

  payload.append(
    "categoryName",
    formData.get("categoryName") as string
  );

  payload.append(
    "categoryDescription",
    formData.get("categoryDescription") as string
  );

  const images = formData.getAll("images") as File[];

  images.forEach((image) => {
    if (image.size > 0) {
      payload.append("images", image);
    }
  });

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties`,
    {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        // ❌ Do NOT set Content-Type.
        // fetch will automatically add the correct multipart boundary.
      },
      body: payload,
    }
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("properties", {
      expire: 0,
    });

    revalidateTag("filter-options", {
      expire: 0,
    });
  }

  return result;
};