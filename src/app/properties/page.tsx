import { fetchProperties } from "@/src/api/properties/route";
import Paragraph from "@/src/components/UI/Paragraph";
import Filter from "@/src/containers/Filter";
import ProperyListing from "@/src/containers/ProperyListing";
import React from "react";
type SearchParams = { [key: string]: string | string[] | undefined };

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const params = await searchParams;
  // send string words
  const filters: { [key: string]: string | undefined } = {};
  Object.entries(params).forEach(([key, value]) => {
    filters[key] = Array.isArray(value) ? value[0] : value;
  });
  const properties = await fetchProperties(filters);

  return (
    <div className="relative container">
      <Filter />
      <div className="flexCol items-center pb-4">
        <h1 className="text-lg md:text-2xl font-semibold text-gray-90">
          Enjoy The Finest Homes
        </h1>
        <Paragraph size="sm" color="dark">
          From as low as $10 per day with limited time offer discounts.
        </Paragraph>
      </div>
      <ProperyListing properties={properties} isFilterPage={true} />
    </div>
  );
};

export default Page;
