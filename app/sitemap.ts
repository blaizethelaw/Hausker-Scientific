import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.hauskersci.com'
  return [
    { url: base + '/', changeFrequency: 'monthly', priority: 1 },
  ]
}
