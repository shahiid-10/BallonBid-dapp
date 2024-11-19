import React, { useEffect, useState } from "react";
import { formatUnits } from "viem";
import { useReadContract } from "wagmi";
import { abi } from "../abi";
import axios from "axios";
import { motion } from "framer-motion";
import AuctionCountdown from "./AuctoinCountdown.jsx";
import { CgSandClock } from "react-icons/cg";

const NftCard = () => {
  // const [tokenUri, setTokenUri] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const { data: uri } = useReadContract({
    abi,
    address: "0x171694149C31ecF18FB910d632dd359a7A651e34",
    functionName: "getNFTUri",
  });
  useEffect(() => {
    const fetchMetadata = async () => {
      if (uri) {
        try {
          const response = await axios.get(uri);
          setImgUrl(response.data.image);
        } catch (error) {
          console.error("Error fetching nft img:", error);
        }
      }
    };

    fetchMetadata();
  }, [uri]);

  const { data } = useReadContract({
    abi,
    address: "0x171694149C31ecF18FB910d632dd359a7A651e34",
    functionName: "getHighestBid",
  });
  const highestBid = data ? formatUnits(data, 18) : "Loading...";

  // const { data: endTime } = useReadContract({
  //   abi,
  //   address: "0x171694149C31ecF18FB910d632dd359a7A651e34",
  //   functionName: "getAuctionEndTime",
  // });

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.3, ease: "linear" }}
      className="relative h-full w-full group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/30 rounded-2xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 " />

      <img
        src={imgUrl}
        alt="The GOAT Messi"
        className="w-full h-full rounded-2xl shadow-2xl transform transition duration-300 group-hover:scale-[1.01]  contrast-120 "
      />

      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md rounded-full px-4 py-2 flex items-center space-x-2 z-20">
        <CgSandClock size={20} className="hidden md:block text-white" />
        <AuctionCountdown />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent rounded-b-2xl z-20 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        <div className="space-y-2">
          <p className="text-white/90 text-sm font-medium">
            Current Highest Bid
          </p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-white">{highestBid}</span>
            <span className="text-white/70">ETH</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NftCard;
