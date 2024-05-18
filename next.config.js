/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    API_JADWAL_SOLAT: process.env.API_JADWAL_SOLAT,
    API_QURAN: process.env.API_QURAN,
    SALT: process.env.SALT,
  },
}

module.exports = nextConfig
