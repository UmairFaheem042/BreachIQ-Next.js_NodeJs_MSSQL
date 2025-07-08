"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getEmailToTrackDetails } from "@/lib/actions/breach";
import { toast } from "react-toastify";
import BreachNumbers from "./BreachNumbers";

const BreachStats = ({ breachData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    try {
      setLoading(true);
      const res = await getEmailToTrackDetails();

      if (res?.success) {
        toast.success(res.message || "Scan successful");
        router.refresh();
      } else {
        toast.error(res?.message || "Scan failed");
      }
    } catch (err) {
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="w-[600px] mt-2 rounded-md h-[150px] flex items-center gap-2 justify-center">
        {!breachData ? (
          // <SkeletonStat />
          <p className="text-2xl text-center">
            Conduct your first Breach Check
          </p>
        ) : (
          <BreachNumbers
            breachCount={breachData.data.breach_count}
            email={breachData.data.email_to_track}
            last_checked={breachData.data.last_checked}
          />
        )}
      </div>
      <button
        className={`btn btn-success text-xl w-35 h-35 rounded-full ${
          loading ? "btn-disabled loading" : ""
        }`}
        onClick={handleScan}
        disabled={loading}
      >
        {loading ? "Checking..." : "Breach Check"}
      </button>
    </div>
  );
};

export default BreachStats;
