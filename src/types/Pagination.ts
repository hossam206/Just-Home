import { AnchorHTMLAttributes } from "react";
export type PaginationLinkProps = {
  isActive?: boolean;
  size?: "icon" | "sm" | "md" | "lg";
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;
export type PaginationProps = {
  totalPages: number;
  currentPage: number;
  basePath?: string;
  onPageChange?: (page: number) => void;
};
