import CVSnapshots from "./_components/CVSnapshots";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

async function SnapshotPage({ params }: { params: { fileId: string } }) {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="">
      <CVSnapshots cvId={params.fileId} />
    </div>
  );
}

export default SnapshotPage;