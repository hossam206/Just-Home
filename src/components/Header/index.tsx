"use client";
import React, { useState } from "react";
import Navbar from "../Navbar";
import { HeaderStyles } from "./classNames";

import TextInput from "../UI/TextInput";
import { IoIosSearch } from "react-icons/io";

const Header = () => {
  const [searchWord, setSearchWord] = useState("");
  return (
    <div
      className={HeaderStyles.container}
      style={{
        backgroundPosition: "20% center",
      }}
    >
      <Navbar />
      <div className={HeaderStyles.contetDiv}>
        <hgroup className="flex flex-col items-center justify-center space-y-4">
          <span className={HeaderStyles.guidText}>LET US GUIDE YOUR HOME</span>
          <h1 className="text-3xl lg:text-5xl text-center ">
            Discover a place you'll love to live
          </h1>
        </hgroup>
        <hgroup className="flex gap-4 md:text-base  border-b border-gray-50 pb-2 text-xs">
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
            className="bg-secondary text-black p-2 rounded-full hover:opacity-80"
          >
            <IoIosSearch size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
