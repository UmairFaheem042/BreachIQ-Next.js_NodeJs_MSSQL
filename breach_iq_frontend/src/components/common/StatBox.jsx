import React from "react";

const StatBox = ({ label, count, email, name }) => {
  return (
    <div className="p-3 rounded-md w-fit border border-gray-100">
      <div className="stat-title">{label}</div>
      <div className="mt-2 stat-actions">
        <button
          className={`btn btn-xs text-[0.7rem] ${email && "btn-success"} ${
            count && "btn-error"
          } ${name && "btn-neutral"}`}
        >
          {email && email}
          {count && count}
          {name && name}
        </button>
      </div>
    </div>
  );
};

export default StatBox;
