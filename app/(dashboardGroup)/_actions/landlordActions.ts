"use server";

import { AuthState } from "@/lib/types";
import { handleApiError } from "@/service/hadleApiError";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

const buildSearchParams = (
  query?: Record<string, string | string[] | undefined>,
) => {
  const params = new URLSearchParams();

  if (!query) return params;

  Object.entries(query).forEach(([key, value]) => {
    if (!value) return;

    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else {
      params.set(key, value);
    }
  });

  return params;
};

// Get landlord's own properties
export const getLandlordOwnProperties = async ({
  query,
}: {
  query?: Record<string, string | string[] | undefined>;
}) => {
  const params = buildSearchParams(query);
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/properties?${params}`,
    {
      headers,
      cache: "no-store",
    },
  );

  return res.json();
};

// Get rental requests for landlord's properties
export const getLandlordRentalRequests = async ({
  query,
}: {
  query?: Record<string, string | string[] | undefined>;
}) => {
  const params = buildSearchParams(query);
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/requests?${params}`,
    {
      headers,
      next: {
        tags: ["landlord-rental-requests"],
      },
      cache: "no-cache",
    },
  );

  return res.json();
};

// Approve or reject a rental request
export async function updateRentalRequestStatus(
  rentalRequestId: string,
  status: "APPROVED" | "REJECTED",
  prevState: AuthState,
): Promise<AuthState> {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/requests/${rentalRequestId}`,
    {
      method: "PATCH",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    },
  );
  const result = await res.json();

  if (result.success) {
    revalidateTag("landlord-rental-requests", "max");
  }

  return result;
}

// Create a new property

export const createProperty = async (
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> => {
  const headers = await getAuthHeaders();

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

export const updateProperty = async (
  propertyId: string,
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> => {
  const headers = await getAuthHeaders();

  const availableFrom = formData.get("availableFrom") as string | null;
  const payload: Record<string, unknown> = {
    title: formData.get("title"),
    description: formData.get("description"),
    city: formData.get("city"),
    address: formData.get("address"),

    price: formData.get("price")
      ? parseFloat(formData.get("price") as string)
      : null,

    bedrooms: formData.get("bedrooms")
      ? parseInt(formData.get("bedrooms") as string, 10)
      : null,

    bathrooms: formData.get("bathrooms")
      ? parseInt(formData.get("bathrooms") as string, 10)
      : null,

    area: formData.get("area")
      ? parseFloat(formData.get("area") as string)
      : null,

    categoryName: formData.get("categoryName"),
    categoryDescription: formData.get("categoryDescription"),

    availableFrom: availableFrom ? new Date(availableFrom).toISOString() : null,

    furnished: formData.has("furnished"),
    isAvailable: formData.has("available"),
  };

  console.log("Payload:", payload);
  // console.table(payload);

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`,
    {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();

  if (result?.success) {
    revalidatePath("/landlord-dashboard/properties");
    revalidatePath("/landlord-dashboard");
    revalidatePath("/properties");
    revalidatePath(`/properties/${propertyId}`);
  }

  return result;
};

// Delete a property
export const deleteProperty = async (
  propertyId: string,
): Promise<AuthState> => {
  try {
    const headers = await getAuthHeaders();

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`,
      {
        method: "DELETE",
        headers,
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        statusCode: result.statusCode ?? res.status,
        message: result.message,
      };
    }

    revalidatePath("/landlord-dashboard");
    revalidatePath("/landlord-dashboard/properties");
    revalidatePath("/properties");

    return {
      success: true,
      statusCode: result.statusCode,
      message: result.message,
    };
  } catch (error) {
    return handleApiError(error);
  }
};
// Get property by ID
export const getPropertyById = async (id: string) => {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties/${id}`,
    {
      headers,
      cache: "no-store",
    },
  );

  return res.json();
};

// Get landlord dashboard statistics
export const getLandlordDashboardStats = async () => {
  const headers = await getAuthHeaders();

  try {
    // Fetch properties and rental requests in parallel
    const [properties, rentals] = await Promise.all([
      fetch(
        `${process.env.BACKEND_API_URL}/api/landlord/properties?page=1&limit=1`,
        {
          headers,
          cache: "no-store",
        },
      ).then((r) => r.json()),
      fetch(
        `${process.env.BACKEND_API_URL}/api/landlord/requests?page=1&limit=1`,
        {
          headers,
          cache: "no-store",
        },
      ).then((r) => r.json()),
    ]);

    return {
      success: true,
      data: {
        totalProperties: properties?.data?.meta?.total || 0,
        totalRentalRequests: rentals?.data?.meta?.total || 0,
        activeListings: 0, // Can be calculated if needed
        totalRevenue: 0, // Can be calculated from payments if needed
      },
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to fetch dashboard statistics",
    };
  }
};

// Get rental request details
export const getRentalRequestDetails = async (rentalRequestId: string) => {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals/${rentalRequestId}`,
    {
      headers,
      cache: "no-store",
    },
  );

  return res.json();
};
