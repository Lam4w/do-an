import Archive from "@/app/(main)/archive/_components/Archive";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

async function ArchivePage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="h-[102vh] overflow-scroll">
      <Archive />
    </div>
  );
}

export default ArchivePage;
