import type { MetadataRoute } from "next"

const baseUrl = process.env.NODE_ENV === "production"
  ? "https://adrianpothuaud.github.io"
  : "http://localhost:3000"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: baseUrl + "/sitemap.xml"
  }
}
