import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const Info = () => {
  const [infoOpen, setInfoOpen] = useState(true);
  return (
    <div
      className={
        infoOpen
          ? `py-3 relative  w-full text-center bg-black text-white px-[2rem] flex justify-center items-center`
          : `hidden`
      }
    >
      <h4 className="text-[12px] md:text-sm text-center">
        All NFT images are found from this instagram page{" "}
        <a
          href="https://www.instagram.com/02archives/"
          target="_blank"
          className="underline"
        >
          02archives
        </a>
      </h4>
      <IoClose
        size={20}
        className="cursor-pointer absolute right-[1rem]"
        onClick={() => {
          setInfoOpen(false);
        }}
      />
    </div>
  );
};

export default Info;
