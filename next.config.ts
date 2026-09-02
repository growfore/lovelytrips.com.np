import type { NextConfig } from "next";

const API_ORIGIN = "https://api.tripeleven.com";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // The API serves /uploads/* images with Cross-Origin-Resource-Policy:
        // same-origin, which blocks browsers from loading them cross-origin.
        // Proxying through the app origin makes them same-origin and renders.
        source: "/uploads/:path*",
        destination: `${API_ORIGIN}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
