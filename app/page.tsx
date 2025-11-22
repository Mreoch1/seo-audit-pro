"use client";

import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import OrderForm from "@/components/OrderForm";
import SampleReport from "@/components/SampleReport";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { OrderProvider } from "@/contexts/OrderContext";

export default function Home() {
  return (
    <OrderProvider>
      <main className="min-h-screen">
        <div className="bg-amber-100 border-b-4 border-amber-400 text-amber-900 px-6 py-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-2xl font-bold">Maintenance In Progress</h2>
          </div>
          <p className="text-lg font-semibold max-w-4xl mx-auto">
            We are currently updating our systems to serve you better. Purchases are temporarily paused. Please check back later. Thank you for your patience.
          </p>
        </div>
        <Hero />
        {/* Trusted by section */}
        <TrustedBy />
        <HowItWorks />
        <Features />
        {/* Testimonials section */}
        <Testimonials />
        <Pricing />
        <OrderForm />
        <SampleReport />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </OrderProvider>
  );
}
