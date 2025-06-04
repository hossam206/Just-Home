import { cn } from "@/src/lib/utils";
import React, { ReactNode } from "react";
import { Skeleton } from "./skeleton";

type RenderWithSkeletonProps = {
  value: unknown;
  skeletonWidth?: number | string;
  skeletonHeight?: number | string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string; // Accessibility improvement
};

export const RenderWithSkeleton = React.memo(function RenderWithSkeleton({
  value,
  skeletonWidth = 50,
  skeletonHeight = 20,
  className,
  children,
  ariaLabel = "Loading content",
  ...props
}: RenderWithSkeletonProps) {
  const isValueEmpty = (val: unknown) =>
    val === undefined ||
    val === null ||
    (typeof val === "string" && val.trim() === "") ||
    (Array.isArray(val) && val.length === 0) ||
    (typeof val === "object" && Object.keys(val).length === 0);

  const skeletonClass = cn(
    className,
    `w-[${
      typeof skeletonWidth === "number" ? `${skeletonWidth}px` : skeletonWidth
    }]`,
    `h-[${
      typeof skeletonHeight === "number"
        ? `${skeletonHeight}px`
        : skeletonHeight
    }]`
  );

  if (isValueEmpty(value)) {
    return (
      <Skeleton className={skeletonClass} aria-label={ariaLabel} {...props} />
    );
  }

  return <>{children}</>;
});
