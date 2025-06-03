"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Header from "../components/Header";
type LayoutWrapperProps = {
  children: React.ReactNode;
};
const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const pathname = usePathname();

  const hideNavbarFooterRoutes = ["/auth/login"];
  const shouldHideNavbarFooter = hideNavbarFooterRoutes.includes(pathname);

  return (
    <>
      {!shouldHideNavbarFooter && <Header />}
      <main>{children}</main>
    </>
  );
};

export default LayoutWrapper;
