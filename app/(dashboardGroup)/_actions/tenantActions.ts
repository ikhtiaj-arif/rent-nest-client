"use server";

import { AuthState } from "@/lib/types";
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

export const createRentalRequestAction = async (
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> => {
  const headers = await getAuthHeaders();

  const payload = {
    moveInDate: new Date(formData.get("moveInDate") as string).toISOString(),
    propertyId: formData.get("propertyId"),
  };

  console.log("payload", payload);
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return await res.json();
};


export const createPaymentAction = async (
  rentalRequestId: string,
) => {
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
    }
  );

  return res.json();
};