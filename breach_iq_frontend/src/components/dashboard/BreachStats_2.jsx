import React from "react";
import BreachNumbers from "./BreachNumbers";
import { getEmailToTrackDetails } from "@/lib/actions/breach";

const BreachStats = ({ breachData, email }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="w-[600px] mt-2 rounded-md h-[150px] flex items-center gap-2 justify-center">
        {!breachData && (
          <p className="text-2xl text-center">
            Conduct your first Breach Check
          </p>
        )}
        {breachData && (
          <BreachNumbers
            breachCount={breachData.data.breach_count}
            email={breachData.data.email_to_track}
            last_checked={breachData.data.last_checked}
          />
        )}
      </div>
      <form action={getEmailToTrackDetails}>
        <button className="btn btn-success text-xl w-35 h-35 rounded-full">
          Breach Check
        </button>
      </form>
    </div>
  );
};

export default BreachStats;
