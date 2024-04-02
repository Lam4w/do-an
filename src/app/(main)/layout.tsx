import SidebarWrapper from "@/components/main/SidebarWrapper";
import { getAuthSession } from "@/lib/auth";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAuthSession()
  const subscriptionPlan = await getUserSubscriptionPlan()
  const layout = cookies().get("react-resizable-panels:layout")
  const collapsed = cookies().get("react-resizable-panels:collapsed")

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

  if (!session?.user) {
    redirect("/")
  }

  return (
    <main className="">
      <div className="min-h-screen fixed inset-0">
        <SidebarWrapper 
          userEmail={session?.user.email}
          userImg={session?.user.image}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          subscriptionPlan={subscriptionPlan}
          navCollapsedSize={4}
        >
          {children}
        </SidebarWrapper>
      </div>
    </main>
  );
}