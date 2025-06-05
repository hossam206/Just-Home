"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import Paragraph from "@/src/components/UI/Paragraph";
import TextInput from "@/src/components/UI/TextInput";
import ShowToast from "@/src/components/UI/Toaster/ShowToast";
import Button from "@/src/components/UI/Button";
import { HandleError } from "@/src/utils/HandleError";
import { createStyles } from "../create/classNames";
import { FaPlus } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { countries, propertyTypes } from "../create/assets";
import { defaultValues, validationSchema } from "../create/ValidationSchema";
import { Property } from "@/src/types/property";
import Head from "next/head";
import dynamic from "next/dynamic";

type Country = keyof typeof countries;
const api = process.env.NEXT_PUBLIC_API_URL;

const EditPropertyPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cities, setCities] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const countryOptions = useMemo(() => Object.keys(countries), []);
  const propertyTypeOptions = useMemo(() => propertyTypes, []);

  const formik = useFormik({
    initialValues: {
      id: "",
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
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await fetch(`${api}/properties/${values.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!res.ok) throw new Error("Failed to update property");

        ShowToast("success", "Updated", "Property updated successfully");
        router.push("/");
      } catch (error) {
        console.error(error);
        ShowToast("error", "Error", "Failed to update property");
      }
    },
  });
  const { country, city, district } = formik.values;
  // Fetch property by ID from searchParams
  useEffect(() => {
    const fetchProperty = async () => {
      const idParam = searchParams.get("id");
      if (!idParam) return;

      try {
        const res = await fetch(`${api}/properties/${idParam}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch property");

        const data: Property = await res.json();
        formik.setValues({
          ...defaultValues,
          ...data,
          price: String(data.price),
          area: String(data.area),
          bedrooms: String(data.bedrooms),
          bathrooms: String(data.bathrooms),
          images: data.images || [],
          country: data.location?.country || "",
          city: data.location?.city || "",
          district: data.location?.district || "",
        });
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };
    fetchProperty();
  }, [searchParams]);

  // Update city list when country changes
  useEffect(() => {
    const countryKey = formik.values.country as Country;
    const selected = countries[countryKey];

    if (selected) {
      setCities(Object.keys(selected.cities));
    } else {
      setCities([]);
    }

    if (formik.values.city !== "") {
      formik.setFieldValue("city", "");
    }

    if (formik.values.district !== "") {
      formik.setFieldValue("district", "");
    }

    setDistricts([]);
  }, [country]);
  // Update district list when city changes
  useEffect(() => {
    const countryKey = formik.values.country as Country;
    const cityKey = formik.values.city;

    const selectedCountry = countries[countryKey];
    const cityMap = selectedCountry?.cities as Record<string, string[]>;

    const districts = cityMap?.[cityKey] ?? [];
    setDistricts(districts);

    if (!districts.includes(formik.values.district)) {
      formik.setFieldValue("district", "");
    }
  }, [country, city, district]);

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      formik.setFieldValue("images", [
        ...formik.values.images,
        imageUrl.trim(),
      ]);
      setImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...formik.values.images];
    newImages.splice(index, 1);
    formik.setFieldValue("images", newImages);
  };
  return (
    <>
      <Head>
        <title>Edit Property | Just Home</title>
        <meta
          name="description"
          content="Edit your existing property listing. Update location, pricing, images, and more on Just Home."
        />
        <meta property="og:title" content="Edit Property | Just Home" />
        <meta
          property="og:description"
          content="Manage and update your property listing on Just Home."
        />
        <meta property="og:type" content="website" />
      </Head>

      <div className={createStyles.container}>
        <h2 className="text-xl font-semibold mb-1">Edit Property Details</h2>
        <Paragraph size="sm" color="darkGray" align="left">
          Update the fields below to modify your property listing
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
              mandatory
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.title}
              error={formik.errors.title}
            />
          </div>

          {/* Property Type */}
          <div className="md:col-span-6 col-span-12">
            <label className={createStyles.labelStyle}>
              Property Type<span className="text-red-500">*</span>
            </label>
            <select
              name="propertyType"
              className={createStyles.selectStyle}
              onChange={formik.handleChange}
              value={formik.values.propertyType}
            >
              <option value="">Select Property Type</option>
              {propertyTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
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
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={4}
              maxLength={200}
              placeholder="Describe the property"
              className={`w-full p-3 placeholder:text-xs border rounded-lg resize-none outline-none ${
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.errors.description && formik.touched.description && (
              <HandleError error={formik.errors.description} />
            )}
          </div>

          {/* Country, City, District */}
          <div className="md:col-span-4 col-span-12">
            <label className={createStyles.labelStyle}>Country</label>
            <select
              name="country"
              className={createStyles.selectStyle}
              onChange={formik.handleChange}
              value={formik.values.country}
            >
              <option value="">Select Country</option>
              {countryOptions.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {formik.errors.country && formik.touched.country && (
              <HandleError error={formik.errors.country} />
            )}
          </div>

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
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {formik.errors.city && formik.touched.city && (
              <HandleError error={formik.errors.city} />
            )}
          </div>

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
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
            {formik.errors.district && formik.touched.district && (
              <HandleError error={formik.errors.district} />
            )}
          </div>

          {/* Numeric Fields */}
          {(["price", "area", "bedrooms", "bathrooms"] as const)?.map(
            (field) => (
              <div key={field} className="md:col-span-3 col-span-12">
                <TextInput
                  id={field}
                  label={field[0].toUpperCase() + field.slice(1)}
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

          {/* Image URL Add */}
          <div className="col-span-12">
            <div className="grid grid-cols-12 gap-4">
              <div className="md:col-span-11 col-span-10">
                <TextInput
                  id="imageUrl"
                  label="Add Image URL"
                  name="imageUrl"
                  type="text"
                  value={imageUrl}
                  placeholder="https://example.com/image.jpg"
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
            <ul className="mt-2 flex flex-wrap text-sm gap-2">
              {formik.values.images.map((url, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 px-2 py-1 bg-gray-200 rounded"
                >
                  {url}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <IoCloseOutline />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Submit Button */}
          <div className="col-span-12 flex justify-end">
            <Button
              variant="btn-primary"
              type="submit"
              className={createStyles.addPropertyBtn}
            >
              Update Property
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(EditPropertyPage), { ssr: false });
