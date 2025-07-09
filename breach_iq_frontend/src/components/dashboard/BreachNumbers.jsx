import { formatDate, formatDateAndTime } from "@/utils/formatDate";
import React from "react";

const BreachNumbers = ({ breachCount, email, last_checked }) => {
  // const breachCount = 4;
  return (
    <div className="flex-1 stats bg-base-100 border-base-300 border">
      <div className="stat bg-emerald-200">
        <div className="stat-title">Total Breaches</div>
        <div className="stat-value">{breachCount ? breachCount : 0}</div>
        <div className="stat-actions">
          <button className="btn btn-xs text-[0.7rem] btn-success">
            {email}
          </button>
        </div>
      </div>

      <div className="stat bg-red-200">
        <div className="stat-title">Last Checked</div>
        <div className="stat-value">{formatDate(last_checked)}</div>
        <div className="stat-actions">
          <button className="btn btn-xs btn-error">{formatDateAndTime(last_checked)}</button>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default BreachNumbers;
