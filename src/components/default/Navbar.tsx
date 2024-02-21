import Link from "next/link";
import { getAuthSession } from "../../lib/auth";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { buttonVariants } from "../ui/Button";
import UserAccountNav from "./UserAccountNav";

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w0full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            <span>cvdown.</span>
          </Link>

          {/* todo: add mobile navbar */}

          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <Link
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
                href="/pricing"
              >
                Pricing
              </Link>

              {session?.user ? (
                <UserAccountNav user={session.user} />
              ) : (
                <>
                  <Link
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                    href="/sign-in"
                  >
                    Sign in
                  </Link>
                  <Link
                    className={buttonVariants({
                      variant: "default",
                      size: "sm",
                    })}
                    href="/sign-up"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
