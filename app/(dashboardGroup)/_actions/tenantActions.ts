"use server";

import { AuthState } from "@/lib/types";
import { handleApiError } from "@/service/hadleApiError";
import { revalidatePath } from "next/cache";
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

export const getTenantsOwnRentalRequests = async ({
  query,
}: {
  query?: Record<string, string | string[] | undefined>;
}) => {
  const params = buildSearchParams(query);
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals?${params}`,
    {
      headers,
      cache: "no-store",
    },
  );

  return res.json();
};

export const getTenantsOwnPayments = async ({
  query,
}: {
  query?: Record<string, string | string[] | undefined>;
}) => {
  const params = buildSearchParams(query);
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments?${params}`,
    {
      headers,
      cache: "no-store",
    },
  );

  return res.json();
};

export const getRentalRequestById = async (id: string) => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals/${id}`, {
    headers,
    cache: "no-store",
  });

  return res.json();
};

export const getPaymentById = async (id: string) => {
  const headers = await getAuthHeaders();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/${id}`, {
    headers,
    cache: "no-store",
  });

  return res.json();
};

// Used by /payment-success, which only has Stripe's session_id from the
// redirect URL query param — not our internal payment.id. This is what
// gets polled to find out whether the webhook has actually confirmed
// the payment yet.
export const getPaymentBySession = async (sessionId: string) => {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments/session/${sessionId}`,
    {
      headers,
      cache: "no-store",
    },
  );

  return res.json();
};

export const createRentalRequestAction = async (
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> => {
  try {
    const headers = await getAuthHeaders();

    const payload = {
      moveInDate: new Date(
        formData.get("moveInDate") as string,
      ).toISOString(),
      propertyId: formData.get("propertyId"),
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        statusCode: result.statusCode ?? res.status,
        message: result.message ?? "Failed to submit rental request.",
      };
    }

    revalidatePath("/dashboard/rental-requests");

    return {
      success: true,
      statusCode: result.statusCode,
      message: result.message ?? "Rental request submitted successfully.",
      data: result.data,
    };
  } catch (error) {
    return handleApiError(error);
  }
};


export const createPaymentAction = async (rentalRequestId: string) => {
  try {
    const headers = await getAuthHeaders();

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/payments/create`,
      {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rentalRequestId,
        }),
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        statusCode: result.statusCode ?? res.status,
        message: result.message ?? "Failed to start payment.",
      };
    }

    return result;
  } catch (error) {
    return handleApiError(error);
  }
};

export async function createReview(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  try {
    const headers = await getAuthHeaders();

    const payload = {
      rating: Number(formData.get("rating")),
      comment: formData.get("comment"),
      propertyId: formData.get("propertyId"),
      rentalRequestId: formData.get("rentalRequestId"),
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        statusCode: result.statusCode ?? res.status,
        message: result.message ?? "Failed to submit review.",
      };
    }

    revalidatePath("/dashboard/rental-requests");
    revalidatePath(`/properties/${payload.propertyId}`);

    return {
      success: true,
      statusCode: result.statusCode,
      message: result.message ?? "Review submitted successfully.",
      data: result.data,
    };
  } catch (error) {
    return handleApiError(error);
  }
}


// cancel rental
export const cancelRentalRequestAction = async (
  rentalRequestId: string,
): Promise<AuthState> => {
  try {
    const headers = await getAuthHeaders();

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/rentals/${rentalRequestId}/cancel`,
      {
        method: "PATCH",
        headers,
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        statusCode: result.statusCode ?? res.status,
        message: result.message ?? "Failed to cancel rental request.",
      };
    }

    revalidatePath("/dashboard/rental-requests");
    revalidatePath(`/dashboard/rental-requests/${rentalRequestId}`);

    return {
      success: true,
      statusCode: result.statusCode,
      message: result.message ?? "Rental request cancelled successfully.",
      data: result.data,
    };
  } catch (error) {
    return handleApiError(error);
  }
};

export const endRentalAction = async (
  rentalRequestId: string,
): Promise<AuthState> => {
  try {
    const headers = await getAuthHeaders();

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/rentals/${rentalRequestId}/end`,
      {
        method: "PATCH",
        headers,
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        statusCode: result.statusCode ?? res.status,
        message: result.message ?? "Failed to end rental.",
      };
    }

    revalidatePath("/dashboard/rental-requests");
    revalidatePath(`/dashboard/rental-requests/${rentalRequestId}`);
    revalidatePath("/dashboard/payments");

    return {
      success: true,
      statusCode: result.statusCode,
      message: result.message ?? "Rental ended successfully.",
      data: result.data,
    };
  } catch (error) {
    return handleApiError(error);
  }
};