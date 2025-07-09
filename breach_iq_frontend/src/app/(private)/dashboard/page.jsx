import AnimatedSection from "@/components/common/AnimatedSection";
import BreachScan from "@/components/dashboard/BreachScan";
import BreachStats from "@/components/dashboard/BreachStats";
import { checkAuthStatus } from "@/lib/actions/auth";
import { getAllBreaches } from "@/lib/actions/breach";

const Dashboard = async () => {
  const { user } = await checkAuthStatus();
  const breachData = await getAllBreaches();

  return (
    <AnimatedSection>
      <div className="mt-10 px-3 md:px-6 max-w-[1300px] w-full mx-auto">
        <h1 className="text-center md:text-left text-3xl md:text-4xl font-light">
          Welcome{" "}
          <span className="block md:inline text-4xl font-bold capitalize">
            {user.first_name} {user.last_name ?? ""}
          </span>
        </h1>
        <p className="mt-5 md:mt-2 text-gray-500 text-[0.9rem] md:text-[0.95rem] text-center md:text-left font-thin">
          We track the breaches. You stay aware and in control.
        </p>

        <BreachStats breachData={breachData} email={user.email} />
        <BreachScan
          breachData={breachData}
          last_checked={breachData?.data?.last_checked}
        />
      </div>
    </AnimatedSection>
  );
};

export default Dashboard;
