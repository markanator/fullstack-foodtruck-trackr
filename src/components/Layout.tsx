import React from "react";
import Footer from "./Footer";
import Head from "next/head";
import { siteConfig } from "~/config/site.config";
import MobileNavBar from "./MobileNavBar";
import HeaderNav from "./HeaderNav";

type Props = {
  title?: string;
  children?: React.ReactNode;
};

function Layout({ children, title }: Props) {
  return (
    <>
      <Head>
        <title>{title ?? siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderNav />
      <MobileNavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
