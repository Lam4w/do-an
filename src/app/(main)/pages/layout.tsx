import { getUserSubscriptionPlan } from "@/lib/stripe";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const subscriptionPlan = await getUserSubscriptionPlan()

  if (!subscriptionPlan?.isSubscribed) {
    redirect("/")
  }

  return (
    <div className="">
      {children}
    </div>
  );
}