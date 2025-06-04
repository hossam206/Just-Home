"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Header from "../components/Header";
import Toaster from "../components/UI/Toaster";
type LayoutWrapperProps = {
  children: React.ReactNode;
};
const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const pathname = usePathname();

  const hideNavbarFooterRoutes = ["/auth/login", "/admin/properties/create"];
  const shouldHideNavbarFooter = hideNavbarFooterRoutes.includes(pathname);

  return (
    <>
      {!shouldHideNavbarFooter && <Header />}
      <main>{children}</main>
      <Toaster />
    </>
  );
};

export default LayoutWrapper;
