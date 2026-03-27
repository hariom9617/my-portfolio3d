import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://hariom-patil.in/sitemap.xml",
    host: "https://hariom-patil.in",
  };
}
