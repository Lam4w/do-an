import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import UpgradeButton from '@/components/global/UpgradeButton'
import { buttonVariants } from '@/components/ui/Button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip'
import { PLANS } from '@/config/stripe'
import { getAuthSession } from '@/lib/auth'
import { cn } from '@/lib/utils'
import {
  ArrowRight,
  Check,
  HelpCircle,
  Minus,
} from 'lucide-react'
import Link from 'next/link'

const Page = async () => {
  const session = await getAuthSession()

  const pricingItems = [
    {
      plan: 'Free',
      tagline: 'Some cool features are for free.',
      features: [
        {
          text: 'Unlimited number of CV created',
        },
        {
          text: 'Acces to all templates',
        },
        {
          text: 'PDF export',
        },
        {
          text: 'Access to personal Website builder',
          negative: true,
        },
      ],
    },
    {
      plan: 'Pro',
      tagline: 'Cooler features are waiting for you.',
      features: [
        {
          text: 'Unlimited number of CV created',
          negative: false
        },
        {
          text: 'Acces to all templates',
        },
        {
          text: 'PDF export',
        },
        {
          text: 'Access to personal Website builder',
        },
      ],
    },
  ]

  return (
    <>
      <MaxWidthWrapper className='mb-8 mt-24 text-center max-w-5xl'>
        <div className='mx-auto mb-10 sm:max-w-lg'>
          <h1 className='text-6xl font-bold sm:text-7xl'>
            Pricing
          </h1>
          <p className='mt-5 text-gray-600 sm:text-lg'>
            Whether you&apos;re just trying out our service
            or need more, we&apos;ve got you covered.
          </p>
        </div>

        <div className='pt-12 grid grid-cols-1 gap-10 lg:grid-cols-2'>
          <TooltipProvider>
            {pricingItems.map(
              ({ plan, tagline, features }) => {
                const price =
                  PLANS.find(
                    (p) => p.slug === plan.toLowerCase()
                  )?.price.amount || 0

                return (
                  <div
                    key={plan}
                    className={cn(
                      'relative rounded-2xl bg-white shadow-lg',
                      {
                        'border-2 border-emerald-600 shadow-emerald-200':
                          plan === 'Pro',
                        'border border-gray-200':
                          plan !== 'Pro',
                      }
                    )}>
                    {plan === 'Pro' && (
                      <div className='absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-3 py-2 text-sm font-medium text-white'>
                        Upgrade now
                      </div>
                    )}

                    <div className='p-5'>
                      <h3 className='my-3 text-center font-display text-3xl font-bold'>
                        {plan}
                      </h3>
                      <p className='text-gray-500'>
                        {tagline}
                      </p>
                      <p className='my-5 font-display text-6xl font-semibold'>
                        ${price}
                      </p>
                      <p className='text-gray-500'>
                        per month
                      </p>
                    </div>

                    <div className='flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50'>
                      <div className='flex items-center space-x-1'>
                        <HelpCircle className='h-4 w-4 text-zinc-500' />
                      </div>
                    </div>

                    <ul className='my-10 space-y-5 px-8'>
                      {features.map(
                        ({ text, negative }) => (
                          <li
                            key={text}
                            className='flex space-x-5'>
                            <div className='flex-shrink-0'>
                              {negative ? (
                                <Minus className='h-6 w-6 text-gray-300' />
                              ) : (
                                <Check className='h-6 w-6 text-emerald-500' />
                              )}
                            </div>
                              <p
                                className={cn(
                                  'text-gray-600',
                                  {
                                    'text-gray-400':
                                      negative,
                                  }
                                )}>
                                {text}
                              </p>
                          </li>
                        )
                      )}
                    </ul>
                    <div className='border-t border-gray-200' />
                    <div className='p-5'>
                      {plan === 'Free' ? (
                        <Link
                          href={
                            session?.user ? '/dashboard' : '/sign-in'
                          }
                          className={buttonVariants({
                            className: 'w-full',
                            variant: 'secondary',
                          })}>
                          {session?.user ? 'Upgrade now' : 'Sign up'}
                          <ArrowRight className='h-5 w-5 ml-1.5' />
                        </Link>
                      ) : session?.user ? (
                        <UpgradeButton />
                      ) : (
                        <Link
                          href='/sign-in'
                          className={buttonVariants({
                            className: 'w-full',
                          })}>
                          {session?.user ? 'Upgrade now' : 'Sign up'}
                          <ArrowRight className='h-5 w-5 ml-1.5' />
                        </Link>
                      )}
                    </div>
                  </div>
                )
              }
            )}
          </TooltipProvider>
        </div>
      </MaxWidthWrapper>
    </>
  )
}

export default Page