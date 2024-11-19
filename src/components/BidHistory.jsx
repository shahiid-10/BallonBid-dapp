import React, { useEffect, useState } from "react";
import { useWatchContractEvent } from "wagmi";
import { abi } from "../abi";
import { formatUnits } from "viem";


const BidHistory = () => {
  const [bids, setBids] = useState([
    {
      id: "/",
      bidder: "0x00",
      amount: 0.01,
      time: new Date().toLocaleString(),
    },
  ]);



  useWatchContractEvent({
    address: "0x171694149C31ecF18FB910d632dd359a7A651e34", 
    abi,
    eventName: "enteredAuction",
    onLogs: async (logs) => {
      // console.log(prevLogs)
      // console.log("Logs received:", logs);

      const newBids = await Promise.all(
        logs.map(async (log) => {
          // console.log("Log structure:", log); 
          const { player, amount } = log.args;
          // console.log(player, amount);
          const blockTimestamp = parseInt(log.blockTimestamp, 16) * 1000;
          // console.log(blockTimestamp);
          // console.log("hash: ", log.transactionHash);

          return {
            id: log.transactionHash || Date.now().toString(), 
            bidder: player || "Unknown",
            amount: amount ? parseFloat(formatUnits(amount, 18)) : 0.01,
            time: new Date(blockTimestamp).toLocaleString() || new Date().toLocaleString(),
          };
        })
      );

      // console.log("New Bids:", newBids);

      setBids((prevBids) => [...prevBids, ...newBids]); 
      // console.log(bids);
    },
  });




  return (
    <div className="">
      {/* {console.log(bids)} */}
      {/* {JSON.stringify(bids)}  */}
      {/* {JSON.stringify(newBid)} */}
      {bids.reverse().map((bid) => (
        <div
          key={bid.id}
          className="flex items-center justify-between py-2 border-b border-gray-700"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
            <div>
              <a href={`https://sepolia.etherscan.io/tx/${bid.id}`}>
                <p className="font-medium hover:text-blue-500">{bid.bidder}</p>
              </a>
              <p className="text-sm text-gray-400">{bid.time}</p>
            </div>
          </div>
          <p className="font-mono font-semibold">{bid.amount} ETH</p>
        </div>
      ))}
    </div>
  );
};

export default BidHistory;
