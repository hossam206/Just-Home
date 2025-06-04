import React from "react";
import { getPropertyById } from "@/src/api/properties/[id]/route";
import PropertyDetailsClient from "./PropertyDetailsClient";
type PropertyPageProps = {
  params: {
    id: string;
  };
};
const PropertyDetailsPage = async ({ params }: PropertyPageProps) => {
  const awaitedParams = await params;
 
  const property = await getPropertyById(awaitedParams.id);

  return <PropertyDetailsClient property={property} />;
};

export default PropertyDetailsPage;
