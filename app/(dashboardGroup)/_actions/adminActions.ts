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

// Get all users with pagination and filtering
export const getAllUsers = async ({
  query,
}: {
  query?: Record<string, string | string[] | undefined>;
}) => {
  const params = buildSearchParams(query);
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/users?${params}`,
    {
      headers,
      cache: "no-store",
    },
  );

  return res.json();
};

// Update user by ID
export const updateUserById = async (
  userId: string,
  payload: Record<string, unknown>,
): Promise<AuthState> => {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/users/${userId}`,
    {
      method: "PATCH",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  return res.json();
};

// Get all properties with pagination and filtering
export const getAllProperties = async ({
  query,
}: {
  query?: Record<string, string | string[] | undefined>;
}) => {
  const params = buildSearchParams(query);
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/properties?${params}`,
    {
      headers,
      cache: "no-store",
    },
  );

  return res.json();
};

// Get all rentals with pagination and filtering
export const getAllRentals = async ({
  query,
}: {
  query?: Record<string, string | string[] | undefined>;
}) => {
  const params = buildSearchParams(query);
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/rentals?${params}`,
    {
      headers,
      cache: "no-store",
    },
  );

  return res.json();
};

// Get rental by ID
export const getRentalById = async (id: string) => {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals/${id}`,
    {
      headers,
      cache: "no-store",
    },
  );

  return res.json();
};

// Get dashboard statistics for admin
export const getAdminDashboardStats = async () => {
  const headers = await getAuthHeaders();

  try {
    // Fetch all data in parallel
    const [users, properties, rentals] = await Promise.all([
      fetch(`${process.env.BACKEND_API_URL}/api/admin/users?page=1&limit=1`, {
        headers,
        cache: "no-store",
      }).then((r) => r.json()),
      fetch(`${process.env.BACKEND_API_URL}/api/admin/properties?page=1&limit=1`, {
        headers,
        cache: "no-store",
      }).then((r) => r.json()),
      fetch(`${process.env.BACKEND_API_URL}/api/admin/rentals?page=1&limit=1`, {
        headers,
        cache: "no-store",
      }).then((r) => r.json()),
    ]);

    return {
      success: true,
      data: {
        totalUsers: users?.data?.meta?.total || 0,
        totalProperties: properties?.data?.meta?.total || 0,
        totalRentals: rentals?.data?.meta?.total || 0,
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
