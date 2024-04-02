import { PLANS } from "@/config/stripe";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { getUserSubscriptionPlan, stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

export async function POST (req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const billingUrl = absoluteUrl('/billing')

    const dbUser = await db.user.findFirst({
      where: {
        id: session.user.id,
      },
    })

    if (!dbUser) return new Response("Unauthorized", { status: 401 });

    const subscriptionPlan = await getUserSubscriptionPlan()

    if (subscriptionPlan.isSubscribed && dbUser.stripeCustomerId) {
      const stripeSession =
        await stripe.billingPortal.sessions.create({
          customer: dbUser.stripeCustomerId,
          return_url: billingUrl,
        })

      return new Response(JSON.stringify({ url: stripeSession.url }))
    }

    const stripeSession =
      await stripe.checkout.sessions.create({
        success_url: billingUrl,
        cancel_url: billingUrl,
        payment_method_types: ['card', 'paypal'],
        mode: 'subscription',
        billing_address_collection: 'auto',
        line_items: [
          {
            price: PLANS.find(
              (plan) => plan.name === 'Pro'
            )?.price.priceIds.test,
            quantity: 1,
          },
        ],
        metadata: {
          userId: session.user.id,
        },
      })

    console.log(stripeSession.url)
    return new Response(JSON.stringify({ url: stripeSession.url }))
  } catch (err) {
    console.log(err)
  }
}