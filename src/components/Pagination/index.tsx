import React from "react";
import { AnchorHTMLAttributes } from "react";
import { cn } from "@/src/lib/utils";
import { PaginationProps } from "@/src/types/Pagination";

export type PaginationLinkProps = {
  isActive?: boolean;
  size?: "icon" | "sm" | "md" | "lg";
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

function PaginationLink({
  isActive,

  ...props
}: PaginationLinkProps) {
  const combinedClass = cn(
    "flex items-center justify-center rounded-full md:rounded-md text-gray-80 cursor-pointer transition-colors",
    isActive
      ? "border border-solid border-gray-60 text-gray-60 font-medium bg-white"
      : "border border-transparent hover:bg-gray-30",
    props.className
  );

  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={combinedClass}
      {...props}
    />
  );
}
const Pagination = ({
  totalPages,
  currentPage,
  basePath = "/page",
  onPageChange,
}: PaginationProps) => {
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    if (onPageChange) {
      onPageChange(page);
    }
  };
  const paginationRange = () => {
    const delta = 2;
    const range: (number | string)[] = [];
    let lastPage = 0;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
        lastPage = i;
      } else if (i - lastPage > 1) {
        range.push("...");
        lastPage = i;
      }
    }
    return range;
  };

  const range = paginationRange();
  return (
    <nav
      aria-label="Pagination"
      className="flexRow justify-center mt-6 space-x-1 md:space-x-2 select-none py-6"
    >
      <PaginationLink
        href={basePath + "/" + Math.max(currentPage - 1, 1)}
        onClick={(e) => {
          if (currentPage === 1) {
            e.preventDefault();
            return;
          }
          e.preventDefault();
          goToPage(currentPage - 1);
        }}
        className={`px-3 ${
          currentPage === 1
            ? "opacity-50 pointer-events-none cursor-not-allowed"
            : "cursor-pointer"
        }`}
        size="md"
        aria-label="Previous Page"
        tabIndex={currentPage === 1 ? -1 : 0}
        aria-disabled={currentPage === 1}
      >
        &laquo; Prev
      </PaginationLink>

      {range.map((page, idx) =>
        page === "..." ? (
          <span
            key={"dots" + idx}
            className="flex items-center justify-center px-1 md:px-2 text-gray-50"
          >
            ...
          </span>
        ) : (
          <PaginationLink
            key={page}
            href={`${basePath}/${page}`}
            isActive={currentPage === page}
            size="md"
            className={`text-sm px-3 py-1 md:px-3 border border-solid    rounded-xl hover:bg-gray-30 ${
              currentPage === page
                ? "bg-white border-gray-40"
                : "bg-transparent border-gray-30"
            }`}
            onClick={(e) => {
              e.preventDefault();
              goToPage(Number(page));
            }}
          >
            {page}
          </PaginationLink>
        )
      )}
      <PaginationLink
        href={basePath + "/" + Math.min(currentPage + 1, totalPages)}
        onClick={(e) => {
          if (currentPage === totalPages) {
            e.preventDefault();
            return;
          }
          e.preventDefault();
          goToPage(currentPage + 1);
        }}
        className={`px-1 md:px-3 ${
          currentPage === totalPages
            ? "opacity-50 pointer-events-none"
            : "cursor-pointer"
        }`}
        size="md"
        aria-label="Next Page"
        tabIndex={currentPage === totalPages ? -1 : 0}
        aria-disabled={currentPage === totalPages}
      >
        Next &raquo;
      </PaginationLink>
    </nav>
  );
};

export default Pagination;
