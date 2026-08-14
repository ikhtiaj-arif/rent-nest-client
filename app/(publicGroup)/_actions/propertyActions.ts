"use server";

import { handleApiError } from "@/service/hadleApiError";



// How long public property data stays fresh in Next.js's cache.
// After this window, the next request triggers a background revalidation
// (stale-while-revalidate) so the user always gets a fast response —
// never a cold fetch — even while fresh data is being fetched behind
// the scenes.
const PROPERTIES_REVALIDATE_SECONDS = 60;     // property lists — 1 min
const PROPERTY_DETAIL_REVALIDATE_SECONDS = 300; // single property — 5 min
const CATEGORIES_REVALIDATE_SECONDS = 3600;    // categories — 1 hour

const SORT_MAP: Record<string, { sortBy: string; sortOrder: "asc" | "desc" }> = {
  newest:     { sortBy: "createdAt",    sortOrder: "desc" },
  oldest:     { sortBy: "createdAt",    sortOrder: "asc"  },
  price_asc:  { sortBy: "price",        sortOrder: "asc"  },
  price_desc: { sortBy: "price",        sortOrder: "desc" },
  rating_desc:{ sortBy: "averageRating",sortOrder: "desc" },
};

export const getProperties = async ({
  query,
}: {
  query?: Record<string, string | string[] | undefined>;
} = {}) => {
  try {
    const params = new URLSearchParams();

    const fields = [
      "searchTerm","type","isAvailable","landlordId",
      "minPrice","maxPrice","page","limit","city","categoryId",
    ] as const;

    fields.forEach((key) => {
      if (query?.[key]) params.set(key, query[key] as string);
    });

    // Translate the UI's combined sort value into the two params the
    // backend actually reads. The old code sent "sort=newest" which the
    // backend silently ignored — so the sort dropdown never worked.
    if (query?.sort) {
      const mapped = SORT_MAP[query.sort as string];
      if (mapped) {
        params.set("sortBy", mapped.sortBy);
        params.set("sortOrder", mapped.sortOrder);
      }
    }

    const url = `${process.env.BACKEND_API_URL}/api/properties?${params}`;

    const res = await fetch(url, {
      // ISR: serve from cache instantly, revalidate in the background.
      // This means user 1 waits for the real fetch; every subsequent user
      // gets the cached response in <5ms until the window expires.
      next: { revalidate: PROPERTIES_REVALIDATE_SECONDS },
    });

    return await res.json();
  } catch (error) {
    return handleApiError(error);
  }
};

export const getPropertyById = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/properties/${id}`,
      {
        next: {
          revalidate: PROPERTY_DETAIL_REVALIDATE_SECONDS,
          // Tag lets revalidatePath/revalidateTag bust this specific
          // property's cache the instant a landlord edits it, without
          // waiting for the 5-minute window to expire naturally.
          tags: [`property-${id}`],
        },
      },
    );

    return await res.json();
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCategories = async () => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/categories`,
      {
        // Categories change almost never — 1 hour cache is conservative.
        // In practice you could go to 24 hours.
        next: { revalidate: CATEGORIES_REVALIDATE_SECONDS },
      },
    );

    return await res.json();
  } catch (error) {
    return handleApiError(error);
  }
};

export const getFilterOptions = async () => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/properties/filter-options`,
      { next: { revalidate: CATEGORIES_REVALIDATE_SECONDS } },
    );

    return await res.json();
  } catch (error) {
    return handleApiError(error);
  }
};