"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import Paragraph from "@/src/components/UI/Paragraph";
import TextInput from "@/src/components/UI/TextInput";
import ShowToast from "@/src/components/UI/Toaster/ShowToast";
import Button from "@/src/components/UI/Button";
import { HandleError } from "@/src/utils/HandleError";
import { createStyles } from "./classNames";
import { FaPlus } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { countries } from "./assets";
import { propertyTypes } from "./assets";
import { validationSchema } from "./ValidationSchema";
import { useRouter } from "next/navigation";
type Country = keyof typeof countries;
type City<C extends Country> = keyof (typeof countries)[C]["cities"];
const AdminPropertyForm = () => {
  const router = useRouter();
  const [cities, setCities] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const formik = useFormik({
    initialValues: {
      id: Date.now(),
      title: "",
      description: "",
      country: "",
      city: "",
      district: "",
      propertyType: "",
      price: "",
      area: "",
      bedrooms: "",
      bathrooms: "",
      images: [] as string[],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
      router.push("/");
      ShowToast("success", "congrats", "new property adding success");
      localStorage.setItem("property", JSON.stringify(values));
      formik.resetForm();
    },
  });

  // Update cities when country changes
  useEffect(() => {
    if (formik.values.country in countries) {
      const selected =
        countries[formik.values.country as keyof typeof countries];
      setCities(Object.keys(selected.cities));
    } else {
      setCities([]);
    }
    formik.setFieldValue("city", "");
    formik.setFieldValue("district", "");
    setDistricts([]);
  }, [formik.values.country]);

  // Update districts when city changes
  useEffect(() => {
    const countryKey = formik.values.country as Country;

    if (countries[countryKey]) {
      const cityKey = formik.values
        .city as keyof (typeof countries)[typeof countryKey]["cities"];

      const countryData = countries[countryKey];
      const cityData = countryData.cities[cityKey];

      if (cityData) {
        setDistricts(cityData);
      } else {
        setDistricts([]);
      }
    } else {
      setDistricts([]);
    }

    formik.setFieldValue("district", "");
  }, [formik.values.city, formik.values.country]);

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      formik.setFieldValue("images", [
        ...formik.values.images,
        imageUrl.trim(),
      ]);
      setImageUrl("");
    }
  };
  // remove images then update image list
  const handleRemoveImage = (index: number) => {
    const newImages = [...formik.values.images];
    newImages.splice(index, 1);
    formik.setFieldValue("images", newImages);
  };

  return (
    <div className={createStyles.container}>
      <h2 className="text-xl font-semibold mb-1"> Add Property Details</h2>
      <Paragraph size="sm" color="darkGray" align="left">
        Fill in all the required information for the property listing
      </Paragraph>

      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-12 gap-4 pt-6"
      >
        {/* Title */}
        <div className="md:col-span-6 col-span-12">
          <TextInput
            id="title"
            label="Title"
            name="title"
            type="text"
            value={formik.values.title}
            placeholder="Property title"
            mandatory={true}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.title}
            error={formik.errors.title}
          />
        </div>
        {/* Property Type */}
        <div className="md:col-span-6 col-span-12">
          <label className={createStyles.labelStyle}>
            Property Type
            <span className="text-red-500 text-md">*</span>
          </label>
          <select
            name="propertyType"
            className={createStyles.selectStyle}
            onChange={formik.handleChange}
            value={formik.values.propertyType}
          >
            <option value="">Select Property Type</option>
            {propertyTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          {formik.errors.propertyType && formik.touched.propertyType && (
            <HandleError error={formik.errors.propertyType} />
          )}
        </div>
        {/* Description */}
        <div className="col-span-12">
          <textarea
            id="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            maxLength={200}
            rows={4}
            placeholder="Describe the property"
            name="description"
            className={`w-full p-3 placeholder:text-xs capitalize  border rounded-lg outline-none resize-none ${
              formik.touched.description && formik.errors.description
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.description && formik.errors.description && (
            <HandleError error={formik.errors.description} />
          )}
        </div>

        {/* Country */}
        <div className="md:col-span-4 col-span-12">
          <label className={createStyles.labelStyle}>Country</label>
          <select
            name="country"
            className={createStyles.selectStyle}
            onChange={formik.handleChange}
            value={formik.values.country}
          >
            <option value="">Select Country</option>
            {Object.keys(countries).map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
          {formik.errors.country && formik.touched.country && (
            <HandleError error={formik.errors.country} />
          )}
        </div>

        {/* City */}
        <div className="md:col-span-4 col-span-12">
          <label className={createStyles.labelStyle}>City</label>
          <select
            name="city"
            className={createStyles.selectStyle}
            onChange={formik.handleChange}
            value={formik.values.city}
            disabled={!cities.length}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
          {formik.errors.city && formik.touched.city && (
            <HandleError error={formik.errors.city} />
          )}
        </div>

        {/* District */}
        <div className="md:col-span-4 col-span-12">
          <label className={createStyles.labelStyle}>District</label>
          <select
            name="district"
            className={createStyles.selectStyle}
            onChange={formik.handleChange}
            value={formik.values.district}
            disabled={!districts.length}
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district}>{district}</option>
            ))}
          </select>
          {formik.errors.district && formik.touched.district && (
            <HandleError error={formik.errors.district} />
          )}
        </div>

        {/* Price, Area, Bedrooms, Bathrooms */}
        {(["price", "area", "bedrooms", "bathrooms"] as const).map((field) => (
          <div key={field} className="md:col-span-3 mt-2 col-span-12">
            <TextInput
              id={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              type="number"
              value={formik.values[field]}
              placeholder={`Enter ${field}`}
              mandatory={true}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched[field]}
              error={formik.errors[field]}
            />
          </div>
        ))}

        {/* Add Image URL */}
        <div className="col-span-12 ">
          <div className="w-full grid grid-cols-12 gap-4  ">
            <div className="md:col-span-11 col-span-10">
              <TextInput
                id="imageUrl"
                label="Add Image URL"
                name="imageUrl"
                className="w-full"
                type="text"
                value={imageUrl}
                placeholder="https://example.com/image.jpg"
                mandatory={false}
                onChange={(e) => setImageUrl(e.target.value)}
                onBlur={() => {}}
                touched={false}
                error=""
              />
            </div>
            <div className="md:col-span-1 col-span-2 flex items-end">
              <Button
                type="button"
                className={createStyles.addImageBtn}
                onClick={handleAddImage}
              >
                <FaPlus size={12} className="mr-1" />
                Add
              </Button>
            </div>
          </div>
          <ul className="mt-2 flexRow flex-wrap text-sm text-gray-70 gap-2">
            {formik.values.images.map((url, i) => (
              <li
                key={i}
                className="flexRow px-2 gap-4 py-1 rounded-lg bg-gray-20"
              >
                {url}
                <span
                  className={createStyles.removeImgBtn}
                  onClick={() => handleRemoveImage(i)}
                >
                  <IoCloseOutline />
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Submit */}
        <div className="col-span-12 flexRow justify-end">
          <Button
            variant="btn-primary"
            type="submit"
            className={createStyles.addPropertyBtn}
          >
            Add Property
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminPropertyForm;
