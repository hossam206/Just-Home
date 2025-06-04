"use client";

import TextInput from "@/src/components/UI/TextInput";
import React, { useState } from "react";
import { filterStyles } from "./classNames";
import Button from "@/src/components/UI/Button";
import { IoIosSearch } from "react-icons/io";
import { useRouter } from "next/navigation";

const Filter = () => {
  const router = useRouter();
  const PropertyTyps = [
    "Coupe",
    "SUV",
    "Minivan",
    "Extended Cab Pickup",
    "Sedan",
    "Passenger Van",
    "Hatchback",
    "Convertible",
    "Crew Cab Pickup",
    "Minivan",
    "Cargo Van",
    "Crew Cab Pickup",
    "Convertible",
    "Wagon",
  ];
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    propertyType: "Apartment",
    bedrooms: "",
    priceMin: "",
    priceMax: "",
  });
  // detect changes in inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // reset inputs
 const handleReset = () => {
   router.push("/properties");
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    // add each field if it's not empty
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    // update URL to /properties?keyword=...&location
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container px-5 max-w-4xl bg-tertiary rounded-2xl py-4 relative -top-12"
    >
      <div className="flexRow flex-wrap lg:flex-nowrap justify-between gap-4">
        {/* Keyword */}
        <div className="flexCol justify-start">
          <label htmlFor="title" className="text-xs font-normal text-gray-40">
            Keyword
          </label>
          <TextInput
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="title - description"
            className={filterStyles.inputStyle}
          />
        </div>

        {/* Location */}
        <div className="flexCol">
          <label
            htmlFor="location"
            className="text-xs font-normal text-gray-40"
          >
            Location
          </label>
          <TextInput
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            className={filterStyles.inputStyle}
          />
        </div>

        {/* Type */}
        <div className="flexCol">
          <label htmlFor="type" className="text-xs font-normal text-gray-40">
            Type
          </label>
          <select
            id="type"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className={filterStyles.selectStyle}
          >
            {PropertyTyps?.map((item,index) => (
              <option key={index}  value={item} className={filterStyles.optionStyle}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Bedrooms */}
        <div className="flexCol">
          <label
            htmlFor="bedrooms"
            className="text-xs font-normal text-gray-40"
          >
            Bedrooms
          </label>
          <TextInput
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            placeholder="e.g. 3"
            className={filterStyles.inputStyle}
          />
        </div>

        {/* Price Range */}
        <div className="flexCol">
          <label
            htmlFor="priceMin"
            className="text-xs font-normal text-gray-40"
          >
            Price Range
          </label>
          <div className="flexRow justify-between gap-2">
            <TextInput
              type="number"
              id="priceMin"
              name="priceMin"
              value={formData.priceMin}
              onChange={handleChange}
              placeholder="Min"
              className={filterStyles.inputStyle}
            />
            <TextInput
              type="number"
              id="priceMax"
              name="priceMax"
              value={formData.priceMax}
              onChange={handleChange}
              placeholder="Max"
              className={filterStyles.inputStyle}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-end pt-2 gap-2">
        <Button
          type="button"
          variant="btn-cancel"
          onClick={handleReset}
          className="px-4 !text-black !text-xs"
        >
          reset
        </Button>
        <Button
          type="submit"
          variant="btn-secondary"
          className="p-2 !text-black !text-xs"
        >
          search
          <IoIosSearch className="!text-black" size={16} />
        </Button>
      </div>
    </form>
  );
};

export default Filter;
