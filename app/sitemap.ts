import type { MetadataRoute } from "next";

type SitemapItem = {
  url: string;
  lastModified: Date;
  changeFrequency: "weekly"
  priority: number;
}

const productionBaseUrl = "https://adrianpothuaud.github.io"
const developmentBaseUrl = "http://localhost:3000"

const baseUrl =
  process.env.NODE_ENV === "production"
    ? productionBaseUrl
    : developmentBaseUrl

const supportedLocales = [
  "en",
  "fr"
]

const allPages = [
  "",
  "/contact"
]

const getAllLocalizedSitemapItemsForPag = (page: string): SitemapItem[] => {
  const items: SitemapItem[] = []
  supportedLocales.forEach((locale) => {
    items.push({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    })
  })
  return items
}

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapItems: SitemapItem[] = []
  allPages.forEach((page) => {
    const localizedItems = getAllLocalizedSitemapItemsForPag(page)
    sitemapItems.push(...localizedItems)
  })
  return sitemapItems
}
