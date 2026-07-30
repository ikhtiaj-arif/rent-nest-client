"use server";

import { revalidateTag } from "next/cache";

import { AuthState } from "@/lib/types";
import { isAccessTokenExist } from "@/service/refreshToken";

const getAuthCookie = async () => {
  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    return null;
  }

  return {
    Cookie: `accessToken=${accessToken}`,
  };
};

export const getOwnProperties = async ({
  query,
}: {
  query?: Record<string, string | string[] | undefined>;
}) => {
  const params = new URLSearchParams();

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (typeof value === "string") {
      params.set(key, value);
    }
  });

  const headers = await getAuthCookie();

  if (!headers) {
    return {
      success: false,
      statusCode: 403,
      message: "User not logged in.",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/properties?${params}`,
    {
      cache: "no-store",
      headers,
    },
  );

  return res.json();
};

export const getLandlordRentalRequests = async ({
  query,
}: {
  query?: Record<string, string | string[] | undefined>;
}) => {
  const params = new URLSearchParams();

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (typeof value === "string") {
      params.set(key, value);
    }
  });

  const headers = await getAuthCookie();

  if (!headers) {
    return {
      success: false,
      statusCode: 403,
      message: "User not logged in.",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/requests?${params}`,
    {
      cache: "no-store",
      headers,
    },
  );

  return res.json();
};

export const createProperty = async (
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> => {
  const headers = await getAuthCookie();

  if (!headers) {
    return {
      success: false,
      statusCode: 403,
      message: "User not logged in.",
    };
  }

  const payload = new FormData();

  [
    "title",
    "description",
    "city",
    "address",
    "price",
    "bedrooms",
    "bathrooms",
    "area",
    "categoryName",
    "categoryDescription",
  ].forEach((key) => {
    const value = formData.get(key);
    if (value) payload.append(key, value as string);
  });

  payload.append("furnished", String(formData.get("furnished") === "on"));

  payload.append("available", String(formData.get("available") === "on"));

  payload.append(
    "availableFrom",
    new Date(formData.get("availableFrom") as string).toISOString(),
  );

  (formData.getAll("images") as File[]).forEach((file) => {
    if (file.size > 0) {
      payload.append("images", file);
    }
  });

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/properties`,
    {
      method: "POST",
      headers,
      body: payload,
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("properties", { expire: 0 });
    revalidateTag("filter-options", { expire: 0 });
    revalidateTag("landlord-properties", { expire: 0 });
  }

  return result;
};

export const updateRentalRequestStatus = async (
  rentalRequestId: string,
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> => {
  const headers = await getAuthCookie();

  if (!headers) {
    return {
      success: false,
      statusCode: 403,
      message: "User not logged in.",
    };
  }

  const payload = new FormData();
  payload.append("status", formData.get("status") as string);

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/requests/${rentalRequestId}`,
    {
      method: "PATCH",
      headers,
      body: payload,
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("landlord-rental-requests", {
      expire: 0,
    });

    revalidateTag("properties", {
      expire: 0,
    });
  }

  return result;
};

export const updateProperty = async (
  propertyId: string,
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> => {
  const headers = await getAuthCookie();

  if (!headers) {
    return {
      success: false,
      statusCode: 403,
      message: "User not logged in.",
    };
  }

  const payload = new FormData();

  [
    "title",
    "description",
    "city",
    "address",
    "price",
    "bedrooms",
    "bathrooms",
    "area",
    "categoryName",
    "categoryDescription",
  ].forEach((key) => {
    const value = formData.get(key);

    if (value) {
      payload.append(key, value as string);
    }
  });

  payload.append("furnished", String(formData.get("furnished") === "on"));

  payload.append("available", String(formData.get("available") === "on"));

  payload.append(
    "availableFrom",
    new Date(formData.get("availableFrom") as string).toISOString(),
  );

  (formData.getAll("images") as File[]).forEach((image) => {
    if (image.size > 0) {
      payload.append("images", image);
    }
  });

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`,
      {
        method: "PUT",
        headers,
        body: payload,
      },
    );

    const result = await res.json();

    if (result.success) {
      revalidateTag("properties", { expire: 0 });
      revalidateTag("filter-options", { expire: 0 });
      revalidateTag("landlord-properties", { expire: 0 });
    }

    return result;
  } catch (error) {
    console.error("Update property failed:", error);

    return {
      success: false,
      statusCode: 500,
      message: "Failed to update property.",
    };
  }
};
