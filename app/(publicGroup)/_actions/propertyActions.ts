"use server";

export const getProperties = async ({
  query,
}: {
  query?: Record<string, string | string[] | undefined>;
}) => {
  const params = new URLSearchParams();

  if (query?.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }

  if (query?.type) {
    params.set("type", query.type as string);
  }

  if (query?.isAvailable) {
    params.set("isAvailable", query.isAvailable as string);
  }

  if (query?.landlordId) {
    params.set("landlordId", query.landlordId as string);
  }

  if (query?.minPrice) {
    params.set("minPrice", query.minPrice as string);
  }

  if (query?.maxPrice) {
    params.set("maxPrice", query.maxPrice as string);
  }

  const url = `${process.env.BACKEND_API_URL}/api/properties?${params}`;
  console.log("URL:", url);
  const res = await fetch(url, {
    cache: "no-store",
  });
  const result = await res.json();

  return result;
};

export const getPropertyById = async (id: string) => {
  const url = `${process.env.BACKEND_API_URL}/api/properties/${id}`;
  console.log("URL:", url);
  const res = await fetch(url, {
    cache: "no-store",
  });
  const result = await res.json();
  return result;
};

export const getCategories = async() => {
      const url = `${process.env.BACKEND_API_URL}/api/categories`;
  console.log("URL:", url);
  const res = await fetch(url, {
    cache: "no-store",
  });
  const result = await res.json();
  return result;
}
