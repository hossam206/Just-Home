"use client";
import { PropertyCardProps } from "@/src/types/property";
import React, { useState } from "react";
import TextInput from "@/src/components/UI/TextInput";
import Button from "@/src/components/UI/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { HandleError } from "@/src/utils/HandleError";
import ShowToast from "@/src/components/UI/Toaster/ShowToast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/UI/Carousel";
import { PropertyImage } from "@/src/components/PropertyCard";
import { PropertyDetailsStyles } from "./classNams";
import { CiLocationOn } from "react-icons/ci";
import { FormatNumber } from "@/src/utils/FormatNumber";
import { PiBed } from "react-icons/pi";
import { LiaBathSolid } from "react-icons/lia";
import { RxDimensions } from "react-icons/rx";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import Paragraph from "@/src/components/UI/Paragraph";
const PropertyDetailsClient = ({ property }: PropertyCardProps) => {
  const [loading, setLoading] = useState<"idle" | "loading" | "success">(
    "idle"
  );
  const location = `${property?.location?.country} . ${property?.location?.city} . ${property?.location?.district}`;
  const locationUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    location
  )}`;
  const propetydetails = [
    {
      id: 1,
      title: "type",
      value: property?.propertyType,
      icon: <HiOutlineBuildingOffice2 />,
    },
    {
      id: 2,
      title: "bedrooms",
      value: property?.bedrooms,
      icon: <PiBed />,
    },
    {
      id: 3,
      title: "bathrooms",
      value: property?.bathrooms,
      icon: <LiaBathSolid />,
    },
    { id: 4, title: "area", value: property?.area, icon: <RxDimensions /> },
  ];
  // formik
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required")
      .max(100, "Email should not exceed 100 characters"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^\+?[0-9\s-]{6,}$/, "Invalid Phone number"),
    message: Yup.string()
      .required("Message is required")
      .max(200, "Message cannot exceed 200 characters"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading("loading");
      try {
        console.log(values);
        ShowToast(
          "success",
          "Thanks",
          "we recieved your message will get back to you soon"
        );
      } catch (err: unknown) {
        setLoading("success");
        console.error("Login error:", err);
        ShowToast("error", "sending message failed", "please try again ");
      } finally {
        setTimeout(() => {
          setLoading("idle");
          resetForm();
        }, 1000);
      }
    },
  });
  return (
    <>
      <div className={PropertyDetailsStyles.contentContainer}>
        <div className="lg:col-span-8 md:col-span-6 col-span-12 ">
          {/* location & title*/}
          <div className="my-2 space-y-2">
            <hgroup className="flexRow text-sm text-gray-70 gap-1">
              <span>
                <CiLocationOn />
              </span>
              <a href={locationUrl}>{location}</a>
            </hgroup>
            <hgroup className="flexRow justify-between flex-wrap">
              <h1 className="font-semibold text-xl lg:text-3xl px-1 text-gray-90 tracking-tight capitalize ">
                {property.title}
              </h1>
              <span className="text-red-600 text-2xl font-semibold">
                $ {FormatNumber(property.price)}
              </span>
            </hgroup>
            <Paragraph size="sm" align="left" className="px-1" color="darkGray">
              {property.description}
            </Paragraph>
          </div>

          {/* carsual */}
          <div className="relative">
            <Carousel opts={{ loop: true }} playWithClick={true} numOfSlide={1}>
              <CarouselContent>
                {property?.images?.map((img: string, idx: number) => (
                  <CarouselItem
                    key={idx}
                    className="aspect-[14/9] relative rounded-lg overflow-hidden"
                  >
                    <PropertyImage
                      src={img}
                      alt={`${property.title} image ${idx + 1}`}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div>
                <CarouselPrevious
                  className={`left-2 ${PropertyDetailsStyles.carsualBtn}`}
                />
                <CarouselNext
                  className={`right-2 ${PropertyDetailsStyles.carsualBtn}`}
                />
              </div>
            </Carousel>
          </div>

          <div className=" px-2 flexCol space-y-2">
            <h2 className="my-2 text-xl font-medium">property details :</h2>
            {/* diaplay property properties */}
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
              {propetydetails?.map(({ id, icon, title, value }) => (
                <li key={id} className="flexRow gap-2 space-y-2">
                  <span className=" text-gray-50 pt-2">{icon}</span>
                  <span className="capitalize text-gray-60 font-medium">
                    {title}:
                  </span>
                  <span className="text-gray-90">{value || "N/A"}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={PropertyDetailsStyles.formContainer}>
          <form
            onSubmit={formik.handleSubmit}
            className="border border-solid  border-gray-30 p-4 rounded-lg space-y-2"
            noValidate
          >
            <h2 className="text-lg text-gray-60 font-semibold mb-4">Contact</h2>

            <TextInput
              id="name"
              label="Name"
              name="name"
              type="text"
              placeholder="e.g username"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name ? formik.errors.name : undefined}
              touched={formik.touched.name}
            />
            <TextInput
              id="email"
              label="Email"
              name="email"
              type="text"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email ? formik.errors.email : undefined}
              touched={formik.touched.email}
              placeholder="e.g example@gmail.com"
            />
            <TextInput
              id="phone"
              label="phone"
              name="phone"
              type="number"
              placeholder="e.g 20 12356785565"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone ? formik.errors.phone : undefined}
              touched={formik.touched.phone}
            />
            <hgroup>
              <label
                htmlFor="message"
                className="flex flex-row items-center  gap-1 text-sm font-semibold text-gray-60"
              >
                message
              </label>
              <textarea
                name="message"
                placeholder="type for us"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                maxLength={200}
                rows={4}
                className={`w-full p-3 placeholder:text-xs capitalize  border rounded-lg outline-none resize-none ${
                  formik.touched.message && formik.errors.message
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formik.touched.message && formik.errors.message && (
                <HandleError error={formik.errors.message} />
              )}
            </hgroup>
            <Button
              type="submit"
              variant="btn-primary"
              className="w-full"
              submitStatus={loading}
            >
              Send
            </Button>
          </form>
        </div>
      </div>
      {/* Google Maps Iframe */}
      <div className="container overflow-hidden w-full rounded-lg py-4 ">
        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            location
          )}&output=embed`}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  );
};

export default PropertyDetailsClient;
