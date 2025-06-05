"use client";
import React, { useMemo, useState } from "react";
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
import { defaultValues, validationSchema } from "./ValidationSchema";
import { useRouter } from "next/navigation";
import Head from "next/head";

const AdminPropertyForm = () => {
  const router = useRouter();
  const [cities, setCities] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const countryOptions = useMemo(() => Object.keys(countries), []);
  const propertyTypeOptions = useMemo(() => propertyTypes, []);
  const formik = useFormik({
    initialValues: {
      ...defaultValues,
      id: Date.now(),
    },
    validationSchema,
    onSubmit: (values) => {
      router.push("/");
      ShowToast("success", "congrats", "new property adding success");
      localStorage.setItem("property", JSON.stringify(values));
      formik.resetForm();
    },
  });

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value as keyof typeof countries;
    const selected = countries[selectedCountry];
    const availableCities = selected ? Object.keys(selected.cities) : [];
    formik.setFieldValue("country", selectedCountry);
    formik.setFieldValue("city", "");
    formik.setFieldValue("district", "");

    setCities(availableCities);
    setDistricts([]);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = e.target.value;
    const selectedCountry =
      countries[formik.values.country as keyof typeof countries];
    const availableDistricts =
      (selectedCountry?.cities as Record<string, string[]>)[selectedCity] || [];
    formik.setFieldValue("city", selectedCity);
    formik.setFieldValue("district", "");
    setDistricts(availableDistricts);
  };

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
  const handleRemoveImage = (index: number) =>
    formik.setFieldValue(
      "images",
      formik.values.images.filter((_, i) => i !== index)
    );

  return (
    <>
      <Head>
        <title>Create Property | Just Home</title>
        <meta
          name="description"
          content="Add a new property listing to Just Home. Provide location, price, images, and details to get started."
        />
        <meta property="og:title" content="Create Property | Just Home" />
        <meta
          property="og:description"
          content="Add a new property listing with complete details on Just Home."
        />
        <meta property="og:type" content="website" />
      </Head>

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
              {propertyTypeOptions?.map((type) => (
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
              onChange={handleCountryChange}
              value={formik.values.country}
            >
              <option value="">Select Country</option>
              {countryOptions?.map((country) => (
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
              onChange={handleCityChange}
              value={formik.values.city}
              disabled={!cities.length}
            >
              <option value="">Select City</option>
              {cities?.map((city) => (
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
              {districts?.map((district) => (
                <option key={district}>{district}</option>
              ))}
            </select>
            {formik.errors.district && formik.touched.district && (
              <HandleError error={formik.errors.district} />
            )}
          </div>

          {/* Price, Area, Bedrooms, Bathrooms */}
          {(["price", "area", "bedrooms", "bathrooms"] as const)?.map(
            (field) => (
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
            )
          )}

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
              {formik?.values?.images?.map((url, i) => (
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
    </>
  );
};

export default AdminPropertyForm;
