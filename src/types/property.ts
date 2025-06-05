import { location } from "./location";

export type Property = {
  bedrooms: number;
  bathrooms: number;
  area: number;
  price: number;
  title: string;
  description: string;
  propertyType: string;
  location: location;
  images: string[];
  id: string;
};
export type PropertyCardProps = {
  property: Property;
  id?: string;
};
export type propertiesProps = {
  properties: Property[];

  isFilterPage?: boolean;
  id?: string;
};
