import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Successful",
  description: "Your payment has been confirmed. You'll receive your SEO audit report via email.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

