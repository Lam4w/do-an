import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import type Stripe from 'stripe'

const stripeWebhookEvents = new Set([
  'charge.succeeded',
  'payment_method.attached',
  'customer.created',
  'customer.updated',
  'customer.subscription.created',
  'customer.subscription.updated',
  'payment_intent.succeeded',
  'payment_intent.created',
  'invoice.created',
  'invoice.finalized',
  'invoice.updated',
  'invoice.paid',
  'invoice.payment_succeeded',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
])

export async function POST(request: Request) {
  const body = await request.text()
  const signature = headers().get('Stripe-Signature') ?? ''
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

  let event: Stripe.Event

  try {
    if (!signature || !webhookSecret) {
      console.log(
        'Error Stripe webhook secret or the signature does not exist.'
      )
      return
    }
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error: any) {
    console.log(`Error ${error.message}`)
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  console.log(event.type)

  const session = event.data
    .object as Stripe.Checkout.Session

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription
    const customerId = subscription.customer.toString()

    const user = await db.user.findFirst({
      where: {
        stripeCustomerId: customerId,
      }
    })

    console.log(user)

    await db.user.update({
      where: {
        id: user?.id,
      },
      data: {
        stripeCustomerId: null,
        stripeSubscriptionId: null,
        stripePriceId: null,
        stripeCurrentPeriodEnd: null,
      },
    })
  }

  if (!session?.metadata?.userId) {
    return new Response(null, {
      status: 200,
    })
  }
  
  if (event.type === 'checkout.session.completed') {
    const subscription =
      await stripe.subscriptions.retrieve(
        session.subscription as string
      )

    await db.user.update({
      where: {
        id: session.metadata.userId,
      },
      data: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0]?.price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    })
  }

  if (event.type === 'invoice.payment_succeeded') {
    // Retrieve the subscription details from Stripe.
    const subscription =
      await stripe.subscriptions.retrieve(
        session.subscription as string
      )
    
    await db.user.update({
      where: {
        id: session.metadata.userId,
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0]?.price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    })
  }

  return NextResponse.json(
    {
      webhookActionReceived: true,
    },
    {
      status: 200,
    }
  )
}