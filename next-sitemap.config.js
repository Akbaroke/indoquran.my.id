/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL,
  generateRobotsTxt: true,
  robots: {
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
      `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap-0.xml`,
    ],
  },
  include: ['/', '/quran', '/hadits', '/doa', '/jadwal-sholat'],
  exclude: ['/penanda'],
};
