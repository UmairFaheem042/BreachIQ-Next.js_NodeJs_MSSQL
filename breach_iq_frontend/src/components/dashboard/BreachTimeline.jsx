import { getLastBreach } from "@/lib/actions/breach";
import sortBreaches from "@/utils/sortRecords";
import React from "react";

const BreachTimeline = async () => {
  const data = await getLastBreach();

  console.log("Inside")
 
  // const sortedBreaches = sortBreaches(data);

  return (
    <ul className="mt-5 mx-auto w-full min-w-[350px] timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
      {data?.map((item, index) => (
        <li key={item.id}>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div
            className={
              index % 2 === 0
                ? "timeline-start mb-10 md:text-end"
                : "timeline-end mb-10 md:text-start"
            }
          >
            <span className="font-mono italic">
              {item.breach_date ? item.breach_date : "null"}
            </span>
            <div className="text-lg font-black">{item.breach_name}</div>
          </div>
          <hr />
        </li>
      ))}

    </ul>
  );
};

export default BreachTimeline;
