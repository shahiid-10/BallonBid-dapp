import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { abi } from "../abi";

const AuctionCountdown = () => {
  const { data: endTime } = useReadContract({
    abi,
    address: "0x171694149C31ecF18FB910d632dd359a7A651e34",
    functionName: "getAuctionEndTime",
  });

  const [timeLeft, setTimeLeft] = useState();

  useEffect(() => {
    if (!endTime) return;

    const endTimestamp = Number(endTime); 
    const updateTimer = () => {
      const now = Math.floor(Date.now() / 1000); 
      const remaining = endTimestamp - now;

      if (remaining > 0) {
        setTimeLeft(remaining)
      } else {
        setTimeLeft(0);
        
      }
    };

    updateTimer(); 
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval); 
  }, [endTime]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-white">
      {timeLeft === null ? (
        <p>Loading auction end time...</p>
      ) : timeLeft > 0 ? (
        <p className="font-normal text-sm">Auction ends in: <span className="font-medium">{formatTime(timeLeft)}</span></p>
      ) : (
        <p>auction has ended.</p>
      )}
    </div>
  );
};

export default AuctionCountdown;
