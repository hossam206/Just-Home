import { memo, ReactNode } from "react";
type RenderWithSkeletonProps = {
  value: any;
  skeletonWidth?: number | string;
  skeletonHeight?: number | string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string; // Accessibility improvement
};
export const RenderWithSkeleton = memo(
  ({
    value,
    skeletonWidth = 50,
    skeletonHeight = 20,
    className,
    children,
    ariaLabel = "Loading content",
    ...props
  }: RenderWithSkeletonProps) => {
    // Comprehensive check for empty values
    const isEmpty = (val: any) =>
      val === undefined ||
      val === null ||
      (typeof val === "string" && val.trim() === "") ||
      (Array.isArray(val) && val.length === 0) ||
      (typeof val === "object" && Object.keys(val).length === 0);

    // Dynamically set width and height styles
    const widthStyle =
      typeof skeletonWidth === "number" ? `${skeletonWidth}px` : skeletonWidth;
    const heightStyle =
      typeof skeletonHeight === "number"
        ? `${skeletonHeight}px`
        : skeletonHeight;

    // If value is empty or delay is active, show Skeleton
    if (isEmpty(value)) {
      return (
        <div
          data-slot="skeleton"
          className={className}
          style={{ width: widthStyle, height: heightStyle }}
          aria-label={ariaLabel}
          {...props}
        />
      );
    }

    return <>{children}</>;
  }
);
