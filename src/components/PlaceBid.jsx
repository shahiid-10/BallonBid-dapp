import React, { useEffect, useState } from "react";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { abi } from "../abi";
import { formatUnits, parseUnits } from "viem";
import axios from "axios";
import { Toaster, toast } from 'sonner'


const PlaceBid = () => {
  const [bidAmount, setBidAmount] = useState(0);
  const { writeContract, isPending, data: hash, error } = useWriteContract();
  const [collectionName, setCollectionName] = useState("");

  const bidInWei = parseUnits(bidAmount.toString(), 18);

  ///////////////// PLACE BID /////////////////
  function handleSubmit(e) {
    e.preventDefault();
    writeContract({
      abi,
      address: "0x171694149C31ecF18FB910d632dd359a7A651e34",
      functionName: "placeBid",
      value: bidInWei,
    });

    console.log(error)
  }
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirming) {
      toast.info("Transaction is being confirmed...");
    }
    if (isConfirmed) {
      toast.success("Transaction confirmed successfully!");
    }
    if (error) {
      toast.error(error.shortMessage);
    }
  }, [isConfirming, isConfirmed, error]);

  ///////////////// GET NFT URI /////////////////
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
          setCollectionName(response.data.name);
        } catch (error) {
          console.error("Error fetching nft img:", error);
        }
      }
    };

    fetchMetadata();
  }, [uri]);

  ///////////////// GET HIGHEST BID /////////////////
  const { data } = useReadContract({
    abi,
    address: "0x171694149C31ecF18FB910d632dd359a7A651e34",
    functionName: "getHighestBid",
  });
  const highestBid = data ? formatUnits(data, 18) : "Loading...";

  return (
    <div>
      <div className="bg-gradient-2 backdrop-blur-md rounded-xl p-6 text-white">
        <h1 className=" text-xl md:text-2xl font-bold mb-2">
          {collectionName}
        </h1>
        <div>
          <p className="text-gray-400 mb-1">Current Highest Bid</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold">{highestBid}</span>
            <span className="text-xl text-gray-400">ETH</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="">
            <label htmlFor="bid" className="block text-sm text-gray-300 mb-2">
              Place your bid
            </label>
            <div className="relative items-center flex">
              <input
                type="number"
                id="bid"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="w-full bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-0 "
                placeholder="Enter bid amount"
              />
              <span className="absolute right-4  text-gray-200">ETH</span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full  bg-white text-black hover:bg-white/70  py-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <span>{isPending ? <Loader /> : "Place Bid"}</span>
            {isPending ? null : (
              <HiOutlineArrowCircleRight className="w-5 h-5" />
            )}
          </button>
        </form>
      </div>
      {/* {hash && (
        <div className="font-medium">
          Transaction Hash: <br />
          {hash}
        </div>
      )} */}
      {/* {isConfirming && } */}
      {/* {isConfirmed && <div>Transaction confirmed.</div>} */}
      {/* {error && toast.error(error.shortMessage)} */}
      {/* {error ? toast.error(error.shortMessage): null} */}
    </div>
  );
};

function Loader() {
  return (
    <div role="status" className="flex justify-center items-center">
      <svg
        aria-hidden="true"
        className="w-8 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default PlaceBid;
