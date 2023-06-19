import Link from "next/link";
import React from "react";
import Footer from "~/components/Footer";
import { MainNav } from "~/components/MainNav";
import { buttonVariants } from "~/components/ui/button";
import { marketingConfig } from "~/config/marketing.config";
import { cn } from "~/lib/utils";

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4"
              )}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default layout;
