import React from 'react';
import FeaturedListings from '../components/HomeComponents/FeaturedListings';
// locals
import Hero from '../components/HomeComponents/Hero';
import PopularCatsSection from '../components/HomeComponents/PopularCatsSection';
import Layout from '../components/Layout';
import NewsletterSection from '../components/NewsletterSection';

export default function Home() {
  return (
    <Layout>
      <Hero />
      {/* Featured Categories */}
      <PopularCatsSection />
      {/* Featured Listings */}
      <FeaturedListings />
      {/* SEND EMAIL */}
      <NewsletterSection />
    </Layout>
  );
}
