"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { listarr } from "./assets";
import Link from "next/link";
import { NavbarStyles } from "./classNames";
import { BsTelephone } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import Button from "../UI/Button";
import { RxHamburgerMenu } from "react-icons/rx";
import Paragraph from "../UI/Paragraph";
import { useClickOutside } from "@/src/Hooks/useClickOutside";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null!);
  const [isloggedIn, setIsloggedIn] = useState(false);
  const [MobileScreen, setMobileScreen] = useState(false);
  useClickOutside({ ref: navRef, setTarget: setMobileScreen }); //resuable hook to detect click outside
  const router = useRouter();
  // get login status from locaLStorag
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("loggedIn");
      const loginStatus = stored ? JSON.parse(stored) : false;
      setIsloggedIn(loginStatus);
    }
  }, []);
  return (
    <div>
      {/* pc Navbar */}
      <div className={NavbarStyles.PCcontainer}>
        {/* Logo */}
        <Link href="/" className="p-2">
          <Image
            src={"/Images/Logo/lightLogo.png"}
            alt="website logo"
            width={100}
            height={20}
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
        {/* List */}
        <ul className="flexRow gap-6 ">
          {listarr?.map((item) => (
            <li key={item.id}>
              <Link
                onClick={() => setMobileScreen(false)}
                href={item.link}
                className="capitalize font-normal hover:text-gray-40"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        {/* Contact & Buttons */}
        <div className="flexRow gap-4">
          {/* tel */}
          <div className="flexRow gap-1 text-white text-sm font-normal">
            <BsTelephone size={12} />
            <span>+20 1234567890</span>
          </div>

          {/* profile Icon */}
          <div>
            <span className={NavbarStyles.userIcon}>
              <FaRegUser size={14} />
            </span>
          </div>
          {/* Add btn */}

          <Button
            variant="btn-transparent"
            type="button"
            onClick={() =>
              router.push(
                isloggedIn ? "/admin/properties/create" : "/auth/login"
              )
            }
            className="!rounded-full !text-xs font-normal"
          >
            Add Property
          </Button>
        </div>
      </div>
      {/* mobile Navbar */}
      <div className={NavbarStyles.mobileContainer} ref={navRef}>
        {/* Logo and search */}
        <div className="flexRow justify-between w-full p-1">
          <Link href="/">
            <Image
              src={"/Images/Logo/lightLogo.png"}
              alt="website logo"
              width={180}
              height={40}
              style={{ width: "auto", height: "auto" }}
            />
          </Link>
          <div className="flexRow gap-2  text-white cursor-pointer">
            <span className={NavbarStyles.userIcon}>
              <FaRegUser size={14} />
            </span>
            <span
              onClick={() => setMobileScreen(!MobileScreen)}
              aria-label="toggle menu"
            >
              <RxHamburgerMenu size={24} />
            </span>
          </div>
        </div>
        {/* Overlay */}
        <div
          className={`${NavbarStyles.overlay} ${
            MobileScreen ? "block " : "hidden"
          }`}
        ></div>
        {/* content */}
        <div
          className={`${NavbarStyles.sideDiv} ${
            MobileScreen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Logo */}
          <div className="px-4 space-y-2">
            <Image
              src={"/Images/Logo/darkLogo.png"}
              alt="website logo"
              width={100}
              height={20}
              style={{ width: "auto", height: "auto" }}
            />
            <Paragraph
              size="sm"
              align="left"
              className="text-sm leading-5 text-left py-3 text-black/50"
            >
              Explore a wide range of properties to find your dream home or
              investment opportunity.
            </Paragraph>
          </div>
          {/* Links */}
          <div className="flexCol items-start justify-center  mt-6   px-2">
            {listarr.map((item) => (
              <Link
                onClick={() => setMobileScreen(false)}
                href={item.link}
                className={NavbarStyles.SideBarLinks}
                key={item.id}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="flex flex-col space-y-8 mt-2 px-2">
            {/* 24/7 support */}
            <div className="flexRow gap-1">
              <span>
                <BsTelephone size={16} className="text-gray-60" />
              </span>

              <Link
                href="tel:+201069137667"
                className="font-semibold text-sm text-gray-90"
              >
                (+20) 106 913 7667
              </Link>
            </div>
            {/* Add Button */}
            <Button
              type="button"
              className="w-full "
              variant="btn-primary"
              onClick={() => {
                setMobileScreen(false);
                router.push(
                  isloggedIn ? "/admin/properties/create" : "/auth/login"
                );
              }}
            >
              Add Property
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
