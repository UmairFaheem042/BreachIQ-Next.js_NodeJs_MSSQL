import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { checkAuthStatus } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "BreachIQ - Authorized",
  description: "Protected Routes",
};

export default async function ProtectedLayout({ children }) {
  const { isAuthenticated } = await checkAuthStatus();
  // 🔐 Redirect to login if not authenticated
  if (!isAuthenticated) redirect("/login");

  return (
    <div className="min-h-screen flex flex-col w-full max-[800px] mx-auto">
      <Header />
      {children}
      <Footer />
      <ToastContainer />
    </div>
  );
}
