import Dashboard from "@/app/(main)/dashboard/_components/Dashboard";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="">
      <Dashboard />
    </div>
  );
};

export default page;
