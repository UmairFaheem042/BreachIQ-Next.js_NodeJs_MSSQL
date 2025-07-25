import { formatDate, formatDateAndTime } from "@/utils/formatDate";
import React from "react";

const BreachTable = ({ breaches }) => {
  return (
    <div className="w-full overflow-x-auto ">
  <div className="md:w-[400px] flex-1 flex flexCenter mx-auto min-w-[300px]">
    <table className="min-w-full text-xs md:text-sm table rounded-box border border-base-content/5 bg-base-100">
      <thead>
        <tr>
          <th></th>
          <th>Breach Check Date</th>
          {/* <th>Breach Check Done</th> */}
          <th>Breach Count</th>
        </tr>
      </thead>
      <tbody>
        {breaches.map((item, index) => (
          <tr key={index}>
            <th>{index + 1}</th>
            <td>{formatDateAndTime(item.checked_at)}</td>
            <td>{item.breach_count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default BreachTable;
