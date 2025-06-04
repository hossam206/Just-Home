import { fetchProperties } from "../api/properties/route";
import ProperyListing from "../containers/ProperyListing";

export default async function Home() {
  const properties = await fetchProperties();

  return (
    <>
      <ProperyListing properties={properties} />
    </>
  );
}
