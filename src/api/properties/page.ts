const api = process.env.NEXT_PUBLIC_API_URL;

 
export async function fetchProperties(
  filters: { [key: string]: string | undefined } = {}
) {
  try {
    const res = await fetch(`${api}/properties`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }

    const data = await res.json();

    // Normalize filters
    const title = filters.title?.toLowerCase().trim() || "";
    const location = filters.location?.toLowerCase().trim() || "";
    const propertyType = filters.propertyType?.toLowerCase().trim() || "";
    const bedrooms = filters.bedrooms ? Number(filters.bedrooms) : null;
    const priceMin = filters.priceMin ? Number(filters.priceMin) : null;
    const priceMax = filters.priceMax ? Number(filters.priceMax) : null;

    return data.filter((property: any) => {
      const propertyTitle = property.title?.toLowerCase() || "";
      const description = property.description?.toLowerCase() || "";

      const city = property.location?.city?.toLowerCase() || "";
      const country = property.location?.country?.toLowerCase() || "";
      const district = property.location?.district?.toLowerCase() || "";

      const propType = property.propertyType?.toLowerCase() || "";
      const propBedrooms = Number(property.bedrooms);
      const propPrice = Number(property.price);

      const titleMatch =
        !title || propertyTitle.includes(title) || description.includes(title);

      const locationMatch =
        !location ||
        city.includes(location) ||
        country.includes(location) ||
        district.includes(location);

      const typeMatch = !propertyType || propType === propertyType;
      const bedroomsMatch = bedrooms === null || propBedrooms === bedrooms;
      const priceMinMatch = priceMin === null || propPrice >= priceMin;
      const priceMaxMatch = priceMax === null || propPrice <= priceMax;

      return (
        titleMatch &&
        locationMatch &&
        typeMatch &&
        bedroomsMatch &&
        priceMinMatch &&
        priceMaxMatch
      );
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

