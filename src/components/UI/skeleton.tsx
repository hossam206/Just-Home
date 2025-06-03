import { cn } from "@/src/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-sm  bg-gray-80", className)}
      {...props}
    />
  );
}

export { Skeleton };
