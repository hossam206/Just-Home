"use client";
import useMediaQuery from "@/src/Hooks/useMediaQuery";
import Pagination from "@/src/components/Pagination";
import PropertyCard from "@/src/components/PropertyCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/UI/Carousel";
import Paragraph from "@/src/components/UI/Paragraph";
import { RenderWithSkeleton } from "@/src/components/UI/RenderWithSkeleton";
import { propertiesProps } from "@/src/types/property";
import { paginate } from "@/src/utils/paginate";
import React, { useState } from "react";
import { ListingStyles } from "./classNames";

const ProperyListing = ({ properties, isFilterPage }: propertiesProps) => {
  const pageSize = process.env.NEXT_PUBLIC_ITEMS_PER_PAGE;
  const [currentPage, setCurrentPage] = useState(1);
  const { paginatedItems, totalPages } = paginate(
    properties,
    currentPage,
    Number(pageSize)
  );
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className={`${isFilterPage ? "" : "bg-gray-20 py-10"}`}>
      <div className="container">
        {/* title & description */}
        {!isFilterPage && (
          <div className="flexCol items-center pb-4">
            <h1 className={ListingStyles.Heading}>Homes For You</h1>
            <Paragraph size="sm" align="center" color="darkGray">
              Based on your view history
            </Paragraph>
          </div>
        )}
        {/* Property Listing */}
        {!isMobile ? (
          // Grid view on large screens
          paginatedItems?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
              {paginatedItems.map((property) => (
                <RenderWithSkeleton
                  className="bg-red-500"
                  value={property}
                  key={property.id}
                  skeletonWidth={100}
                  skeletonHeight={50}
                >
                  <PropertyCard property={property} />
                </RenderWithSkeleton>
              ))}
            </div>
          ) : (
            <div className="flexRow justify-center py-6  w-full">
              No result available now, try again
            </div>
          )
        ) : paginatedItems?.length > 0 ? (
          // Carousel on small/medium screens
          <div className="w-full md:px-10 relative">
            <Carousel
              className="w-full"
              opts={{ align: "start" }}
              playWithClick={true}
              numOfSlide={1}
            >
              <div className={ListingStyles.carsualBtn}>
                <CarouselPrevious className="absolute right-10 z-10" />
                <CarouselNext className="absolute right-2 z-10" />
              </div>
              <CarouselContent>
                {paginatedItems.map((property, index) => (
                  <CarouselItem
                    key={index}
                    className="px-2 basis-full sm:basis-1/2"
                  >
                    <RenderWithSkeleton
                      value={property}
                      key={property.id}
                      skeletonWidth={100}
                      skeletonHeight={50}
                    >
                      <PropertyCard property={property} />
                    </RenderWithSkeleton>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        ) : (
          <div className="flexRow justify-center   py-6 w-full">
            No result available now, try again
          </div>
        )}
        {properties?.length != 0 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            basePath="/properties"
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default ProperyListing;
