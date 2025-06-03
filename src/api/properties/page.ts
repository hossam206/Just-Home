// fetch all properties
// app/properties/api/fetchProperties.ts
const api = process.env.NEXT_PUBLIC_API_URL;
export async function fetchProperties() {
  
  try {
    const res = await fetch(`${api}/properties`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}
