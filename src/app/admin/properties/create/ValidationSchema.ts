import * as Yup from "yup";
export const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  district: Yup.string().required("District is required"),
  propertyType: Yup.string().required("Property type is required"),
  price: Yup.number()
    .positive("Must be positive")
    .required("Price is required"),
  area: Yup.number().positive("Must be positive").required("Area is required"),
  bedrooms: Yup.number()
    .min(0, "Cannot be negative")
    .required("Bedrooms required"),
  bathrooms: Yup.number()
    .min(0, "Cannot be negative")
    .required("Bathrooms required"),
  images: Yup.array().min(1, "At least one image is required"),
});
