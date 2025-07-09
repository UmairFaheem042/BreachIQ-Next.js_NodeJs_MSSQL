import AnimatedSection from "@/components/common/AnimatedSection";
import { handleGoogleLogin } from "@/lib/actions/auth";
import { Play } from "lucide-react";
import Link from "next/link";

const Login = () => {
  return (
    <AnimatedSection>
      <div className="flex-1 flex flexCenter min-h-screen relative ">
        <Link href="/" className="absolute top-8 left-7">
          <button className="btn rounded-md btn-neutral font-semibold  text-sm hover:text-[#f2dbc4] flex flexCenter gap-2 transition-all">
            <Play className="size-3 rotate-180" />
            <span>HOME</span>
          </button>
        </Link>
        <section className="px-10 py-8 flex  flex-col gap-5 flexCenter">
          <h2 className="text-xl font-normal">
            Welcome to <span className="font-bold">BreachIQ</span>
          </h2>
          <div className="flex gap-2 flexCenter">
            <form action={handleGoogleLogin}>
              <button className="btn btn-secondary" type="submit">
                Google Login
              </button>
            </form>
            <button className="btn btn-neutral">GitHub Login</button>
          </div>
        </section>
      </div>
    </AnimatedSection>
  );
};

export default Login;
