import clx from "clsx";

// Base styles for the paragraph
export const baseStyles = "font-normal text-md leading-relaxed";

// Size-based styles
export const sizeStyles = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

// Color-based styles
export const colorStyles = {
  dark: "text-gray-90", // Default text color
  darkGray: "text-gray-70",
  light: "text-gray-10", // Lighter text color
  lightGray: "text-gray-50",
  error: "text-red-500",
};

// Alignment-based styles
export const alignStyles = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export const getParagraphStyles = (
  size: keyof typeof sizeStyles,
  color: keyof typeof colorStyles,
  align: keyof typeof alignStyles,
  className?: string
) => {
  return clx(
    baseStyles,
    sizeStyles[size],
    colorStyles[color],
    alignStyles[align],
    className
  );
};
