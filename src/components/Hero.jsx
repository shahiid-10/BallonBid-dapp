import React from 'react'
import NftCard from "./NftCard";
import PlaceBid from "./PlaceBid";
import BidHistory from "./BidHistory";
import { RiHistoryLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
const Hero = () => {
  return (
    <motion.div 
      initial={{ x: 100, opacity: 0,  }}
      animate={{ x: 0,  opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.3, ease: "linear" }}
    className='grid lg:grid-cols-2 md:gap-16 px-2 py-2 md:px-[5rem] md:py-4'>
      {/* <div className='py-[2rem] px-[.5rem] md:py-2 md:px-2 md:h-[550px] md:w-[450px] border-none border-black'> */}
      <div className='py-[2rem] px-[.2rem] md:py-2 md:px-0 md:h-full md:w-full border-none border-black'>
        <NftCard />
      </div>
      <div className='border-none border-red-800'>
        <PlaceBid />
        <div className="bg-gradient-2 text-white border border-black backdrop-blur-md rounded-xl p-6 mt-[2rem]">
            <div className="flex items-center space-x-2 mb-4">
            {/* <History className="w-5 h-5 text-purple-400" /> */}
            <RiHistoryLine className="w-5 h-5 "/>
            <h2 className="text-xl font-semibold">Bid History</h2>
            </div>
            <BidHistory />
        </div>
      </div>
    </motion.div>
  )
}

export default Hero
