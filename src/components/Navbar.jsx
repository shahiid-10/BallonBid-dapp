import React from "react";
import { RiAuctionFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const Navbar = () => {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 1, ease: "linear" }}
      className="border-none md:border-none border-gray-600 text-black"
    >
      <nav className="px-3 pt-8 md:px-[2.4rem] md:py-[2rem] flex justify-between items-center ">
        <div className="flex items-center space-x-2">
          {/* <Hammer className="w-6 h-6 text-black-500" /> */}
          <span className="text-xl font-bold">BallonBid</span>
          <motion.span
            initial={{ opacity: 0, rotate: 0 }} 
            animate={{ opacity: 1, rotate: 360 }} 
            transition={{
              duration: 1,
              delay: 1, 
              ease: "easeInOut"
            }}
          >
            <RiAuctionFill className="w-6 h-6 text-black-500 " />
          </motion.span>
        </div>
        {/* <button className="flex items-center space-x-2 text-white bg-black hover:bg-black/60 px-4 py-2 md:px-4 md:py-2 rounded-lg transition-colors">
          <LuWallet className="w-4 h-4" />
          <span>Connect Wallet</span>
        </button> */}
        <ConnectButton />
      </nav>
    </motion.header>
  );
};

export default Navbar;
