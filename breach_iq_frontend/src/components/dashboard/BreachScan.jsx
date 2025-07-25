import BreachTimeline from "./BreachTimeline";
import { formatDate } from "@/utils/formatDate";

const BreachScan = ({ breachData }) => {
  const { breach_count, last_checked } = breachData?.data || {};

  return (
    <div className="mt-10">
      <h2 className="text-xl md:text-2xl text-center md:text-left font-semibold">
        Last Scan Report
      </h2>
      {breach_count ? (
        <>
          <div role="alert" className="flex md:block mt-5 alert alert-error alert-soft w-full md:w-fit">
            <p className="w-full text-center">
              Last Breach Report done on{" "}
              <span className="font-semibold">{formatDate(last_checked)}</span>
            </p>
          </div>

          <BreachTimeline />
        </>
      ) : (
        <div className="flex btn btn-soft btn-warning disabled pointer-events-none w-fit mt-5 p-2 items-center justify-center">
          No Breaches
        </div>
      )}
    </div>
  );
};

export default BreachScan;
