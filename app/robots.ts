import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://seoauditpro.net";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/success", "/sample-report.pdf"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/success", "/sample-report.pdf"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

