import { fetchProperties } from "../api/properties/page";

export default async function Home() {
  const properties = await fetchProperties();

  return (
    <div>
      <h1>All Properties</h1>
      <ul>
        {properties?.map((item: any) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
