/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { AuthState } from "@/lib/types";
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
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> => {
  const headers = await getAuthHeaders();
  const availableFrom = formData.get("availableFrom") as string;
    if (availableFrom) {
    formData.set("availableFrom", new Date(availableFrom).toISOString());
  }
  // Remove Content-Type header to let browser set it with boundary for multipart
  const headersWithoutContentType = { ...headers };
  // delete headersWithoutContentType["Content-Type"];

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/properties`,
    {
      method: "POST",
      headers: headersWithoutContentType,
      body: formData,
    },
  );

  const result = await res.json();

  // Without this, the create-property dialog closes and the fetch itself
  // isn't cached (cache:"no-store" above) — but the *Router Cache* for
  // pages the user has already visited in this session can still show
  // the pre-create RSC payload until a hard reload or an explicit
  // revalidation. This is what forces the properties list (and anywhere
  // else properties are listed) to actually reflect the new property.
  if (result?.success) {
    revalidatePath("/landlord-dashboard/properties");
    revalidatePath("/landlord-dashboard");
    revalidatePath("/properties");
  }

  return result;
};
export const updateProperty = async (
  propertyId: string,
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> => {
  const headers = await getAuthHeaders();

  // This action is bound via updateProperty.bind(null, property.id) and
  // driven by useActionState, so React actually calls it as
  // (propertyId, prevState, formData) — not (propertyId, payload) as it
  // was previously typed. That mismatch meant `payload` silently received
  // the *previous action state* instead of the form's fields, and
  // JSON.stringify'd that into the request body every time, so edits
  // never actually saved anything.
  //
  // Checkboxes are also excluded from FormData entirely when unchecked
  // (not sent as "false" — just absent), so those need an explicit
  // formData.has(...) check rather than formData.get(...).
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

  availableFrom: formData.get("availableFrom"),

  furnished: formData.has("furnished"),
  isAvailable: formData.has("available"),
};

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
export const deleteProperty = async (propertyId: string) => {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`,
    {
      method: "DELETE",
      headers,
      cache: "no-store",
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
