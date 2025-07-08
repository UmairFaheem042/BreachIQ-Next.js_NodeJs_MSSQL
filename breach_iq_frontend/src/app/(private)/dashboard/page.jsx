import AnimatedSection from "@/components/common/AnimatedSection";
import BreachScan from "@/components/dashboard/BreachScan";
import BreachStats from "@/components/dashboard/BreachStats";
import { checkAuthStatus } from "@/lib/actions/auth";
import { getAllBreaches } from "@/lib/actions/breach";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const { user } = await checkAuthStatus();
  const breachData = await getAllBreaches();

  return (
    <AnimatedSection>
      <h1 className="text-4xl font-normal">
        Welcome{" "}
        <span className="font-semibold capitalize">
          {user.first_name} {user.last_name ?? ""}
        </span>
      </h1>
      <p className="mt-2 text-gray-500 font-thin">
        We track the breaches. You stay aware and in control.
      </p>

      <BreachStats breachData={breachData} email={user.email} />
      <BreachScan
        breachData={breachData}
        last_checked={breachData?.data?.last_checked}
      />
    </AnimatedSection>
  );
};

export default Dashboard;
