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
import { Property, propertiesProps } from "@/src/types/property";
import { paginate } from "@/src/utils/paginate";
import React, { useEffect, useState } from "react";
import { ListingStyles } from "./classNames";

const ProperyListing = ({ properties, isFilterPage }: propertiesProps) => {
  const pageSize = process.env.NEXT_PUBLIC_ITEMS_PER_PAGE;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { paginatedItems, totalPages } = paginate(
    properties,
    currentPage,
    Number(pageSize)
  );

  // simulate loading delay with skeleton
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const skeletonArray: (Property | null)[] = Array.from({
    length: isMobile ? 2 : 8,
  }).map(() => null);

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
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
            {(loading ? skeletonArray : paginatedItems).map((property, idx) => (
              <RenderWithSkeleton
                key={property?.id ?? idx}
                value={loading ? null : property}
                skeletonWidth={300}
                skeletonHeight={240}
              >
                {!loading && property && <PropertyCard property={property} />}
              </RenderWithSkeleton>
            ))}
          </div>
        ) : (
          <div className="w-full md:px-10 relative">
            <Carousel
              className="w-full"
              opts={{ align: "start" }}
              playWithClick={true}
              numOfSlide={1}
            >
              <div className="relative z-40 w-full mb-3 flex justify-end gap-2">
                {properties?.length !== 0 && !loading ? (
                  <div className="flex gap-3">
                    <CarouselPrevious className={ListingStyles.carsualBtn} />
                    <CarouselNext className={ListingStyles.carsualBtn} />
                  </div>
                ) : null}
              </div>

              <CarouselContent>
                {(loading ? skeletonArray : paginatedItems).map(
                  (property, idx) => (
                    <CarouselItem
                      key={property?.id || idx}
                      className="px-2 basis-full sm:basis-1/2"
                    >
                      <RenderWithSkeleton
                        value={loading ? null : property}
                        skeletonWidth="100%"
                        skeletonHeight={300}
                      >
                        {!loading && property && (
                          <PropertyCard property={property} />
                        )}
                      </RenderWithSkeleton>
                    </CarouselItem>
                  )
                )}
              </CarouselContent>
            </Carousel>
          </div>
        )}

        {!loading && properties?.length === 0 && (
          <div className="flexRow justify-center py-10 w-full text-red-600">
            No result available now, try again
          </div>
        )}

        {properties?.length !== 0 && !loading ? (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            basePath="/properties"
            onPageChange={(page) => {
              setLoading(true);
              setCurrentPage(page);
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ProperyListing;
