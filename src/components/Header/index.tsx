"use client";
import React, { useState } from "react";
import Navbar from "../Navbar";
import { HeaderStyles } from "./classNames";

import TextInput from "../UI/TextInput";
import { IoIosSearch } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import Paragraph from "../UI/Paragraph";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const params = new URLSearchParams();
  const [searchWord, setSearchWord] = useState("");
  const backgroundImage = isHome
    ? "url('/Images/Header/HeaderBg.png')" // For filter page
    : "url('/Images/Header/filterHeader.png')"; // Default (home, etc.)
  const searchHome = () => {
    params.set("title", searchWord);
    router.push(`/properties?${params.toString()}`);
  };
  return (
    <div
      className={HeaderStyles.container}
      style={{
        backgroundImage,
        backgroundPosition: "20% center",
      }}
    >
      <Navbar />
      <div className={HeaderStyles.contetDiv}>
        {isHome ? (
          <hgroup className="flex flex-col items-center justify-center space-y-4">
            <span className={HeaderStyles.guidText}>
              LET US GUIDE YOUR HOME
            </span>
            <h1 className="text-3xl lg:text-5xl text-center ">
              Discover a place you'll love to live
            </h1>
          </hgroup>
        ) : (
          <hgroup className="flex flex-col items-center justify-start space-y-3">
            <Paragraph size="sm" align="center" className="text-secondary">
              We’ve more than 745,000 apartments, place & plot.
            </Paragraph>
            <h1 className="text-3xl lg:text-5xl text-center max-w-md">
              Diverse spaces in every corner of the world.
            </h1>
          </hgroup>
        )}
        {isHome && (
          <>
            <hgroup className="flex gap-4 md:text-base border-b border-gray-50 pb-2 text-xs">
              <span className={HeaderStyles.sellORrent}>Sale</span>
              <span className={HeaderStyles.sellORrent}>Rent</span>
            </hgroup>

            <div className={HeaderStyles.inputDiv}>
              <TextInput
                id="headerSearch"
                name="search"
                type="text"
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                placeholder="Enter Name, Keywords..."
                className={HeaderStyles.inputStyle}
              />
              <button
                aria-label="search"
                onClick={searchHome}
                className="bg-secondary text-black p-2 rounded-full hover:opacity-80"
              >
                <IoIosSearch size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
