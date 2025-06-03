import clx from "clsx";

// Base button styles
const baseButtonStyles =
  "flex flex-row items-center justify-center gap-1 text-sm px-2 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out hover:opacity-80 tracking-wide disabled:cursor-not-allowed disabled:opacity-50 outline-none";

// Variant styles
export const variantStyles = {
  "btn-primary": "bg-primary text-white",
  "btn-secondary": "bg-gray-90 text-white hover:opacity-60",
  "btn-delete":
    "bg-[#FFE4DE] text-[#C1342E] hover:bg-[#FFC9BC] hover:text-[#BA241F] transition font-semibold",
  "btn-cancel":
    "bg-gray-30 text-gray-70 hover:bg-gray-40 border border-solid border-gray-40 font-medium",
  loading: "opacity-50 cursor-not-allowed",
  success: "bg-green-500 text-white",
  error: "bg-red-600 text-white",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
} as const;

// Extract types
export type Variant = keyof typeof variantStyles;
export type SubmitStatus = "idle" | "loading" | "success" | "error";

// Get styles based on variant and status
export const getButtonStyles = (
  className?: string,
  variant?: Variant,
  submitStatus?: SubmitStatus,
  disabled?: boolean
) => {
  return clx(
    baseButtonStyles,
    variant && variantStyles[variant],
    submitStatus !== "idle" &&
      variantStyles[submitStatus as Exclude<SubmitStatus, "idle">],
    className,
    disabled && "cursor-not-allowed opacity-50"
  );
};
