import CVSnapshots from "./_components/CVSnapshots";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

async function SnapshotPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="">
      <SnapshotPage />
    </div>
  );
}

export default SnapshotPage;