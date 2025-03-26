/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true, // Ignora errores de ESLint en el build
  },
};

module.exports = nextConfig;
