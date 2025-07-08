import BreachStats from "./BreachStats";
import BreachScan from "./BreachScan";


export default function DashboardClient() {
  return (
    <section className="mt-5 px-6 py-4 flex-1 max-w-[1200px] mx-auto w-full">
      <h1 className="text-4xl font-normal">
        Welcome <span className="font-semibold">Umair Faheem</span>
      </h1>
      <p className="mt-2 text-gray-500 font-thin">
        We track the breaches. You stay aware and in control.
      </p>

      <BreachStats />
      <BreachScan />
    </section>
  );
}
