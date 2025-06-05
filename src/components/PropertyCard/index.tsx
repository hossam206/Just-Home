"use client";
import React, { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../UI/Carousel";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import Link from "next/link";
import { PiBed } from "react-icons/pi";
import { LiaBathSolid } from "react-icons/lia";
import { RxDimensions } from "react-icons/rx";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FormatNumber } from "@/src/utils/FormatNumber";
import { PropertyCardProps } from "@/src/types/property";
import { CiEdit } from "react-icons/ci";
import { peopertyCardStyles } from "./classNames";
import { useRouter } from "next/navigation";

// Image Comp
export const PropertyImage = React.memo(function PropertyImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover transition duration-300 hover:scale-105"
      placeholder="blur"
      blurDataURL="/Images/placeholderImg.jpeg"
      onError={() =>
        setImgSrc(
          "https://via.placeholder.com/600x400?text=Image+Not+Available"
        )
      }
    />
  );
});

// card comp
const PropertyCard = ({ property }: PropertyCardProps) => {
  const router = useRouter();
  const [isLoggedIn, setIsloggedIn] = useState(false);
  // check if user is logedin (admin)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("loggedIn");
      const loginStatus = stored ? JSON.parse(stored) : false;
      setIsloggedIn(loginStatus);
    }
  }, []);

  const location = `${property?.location?.country} . ${property?.location?.city} . ${property?.location?.district}`;
  const locationUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    location
  )}`;

  return (
    <div className={peopertyCardStyles.container}>
      {/* Image Carousel */}
      <div className="relative">
        <hgroup>
          <div className={peopertyCardStyles.forRent}>For Rent</div>
          {isLoggedIn && (
            <span
              className={peopertyCardStyles.editBtn}
              onClick={() =>
                router.push(`/admin/properties/edit?id=${property.id}`)
              }
            >
              <CiEdit />
            </span>
          )}
        </hgroup>
        <Carousel opts={{ loop: true }} playWithClick={true} numOfSlide={1}>
          <CarouselContent>
            {property?.images?.map((item, index) => (
              <CarouselItem
                key={index}
                className="aspect-[14/9] relative rounded-lg overflow-hidden "
              >
                <PropertyImage
                  src={item}
                  alt={`${property.title} image ${index + 1}`}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Info */}
      <div className="flex flex-col space-y-3 ">
        {/* Title + Price */}
        <div className=" px-1 flex justify-between items-center text-sm">
          <Link href={`/properties/${property.id}`}>
            <h2 className="font-semibold hover:underline transition">
              {property.title}
            </h2>
          </Link>
          <span className="text-red-600 font-medium">
            ${FormatNumber(property.price)}
          </span>
        </div>

        {/* Location */}
        <a
          href={locationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={peopertyCardStyles.Location}
        >
          <CiLocationOn size={18} />
          <span>{location}</span>
        </a>

        <div className="flex items-center gap-1 text-xs text-gray-70 px-1 ">
          <HiOutlineBuildingOffice2 size={14} />
          <span>{property.propertyType}</span>
        </div>
        {/* Features */}
        <div className={peopertyCardStyles.FeatureContainer}>
          <div className="flex items-center gap-1">
            <PiBed size={14} />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1 border-r  border-solid font-medium">
            <LiaBathSolid size={14} />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <RxDimensions size={14} />
            <span>{property.area} area</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
