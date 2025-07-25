import AnimatedSection from "@/components/common/AnimatedSection";
import StatBox from "@/components/common/StatBox";
import BreachTable from "@/components/history/BreachTable";
import Pagination from "@/components/history/Pagination";
import { getAllBreachHistory } from "@/lib/actions/breach";

const History = async ({ searchParams }) => {
  const { page } = (await searchParams) || 1;
  const breach_count = 1;
  const resp = await getAllBreachHistory(page);

  return (
    <AnimatedSection>
        <div className="mt-10 px-3 md:px-6 max-w-[1400px] w-full mx-auto min-h-[60vh] flex flex-col gap-5">
          <h1 className="text-center md:text-left text-3xl md:text-4xl font-normal">Breach Leak History</h1>
          <div className="flex gap-2 stats">
            <StatBox label="Current Email" email={resp.user} />
            <StatBox label="Breach Checks Done" count={resp.totalRecords} />
            {/* <StatBox label="Highest Breacher" name="Stealer logs" /> */}
          </div>
          {breach_count === 0 ? (
            <div className="flex-1 flex flexCenter w-[400px] uppercase font-semibold text-gray-400 mx-auto text-center text-2xl">
              You haven’t performed any breach checks yet. Start now to stay
              informed!
            </div>
          ) : (
            <BreachTable breaches={resp.data} />
          )}
          {/* <Pagination data={resp} /> */}
          <Pagination
            currentPage={parseInt(page)}
            totalPages={resp.totalPages}
          />
        </div>
    </AnimatedSection>
  );
};

export default History;
