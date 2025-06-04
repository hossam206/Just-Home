const api = process.env.NEXT_PUBLIC_API_URL;

export async function getPropertyById(id: string) {
  try {
    const res = await fetch(`${api}/properties/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch property with id ${id}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching property by ID:", error);
    return null;
  }
}
