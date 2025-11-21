"use client";

import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import TrustIndicators from "@/components/TrustIndicators";
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
        <Hero />
        {/* Trusted by section */}
        <TrustedBy />
        <TrustIndicators />
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

