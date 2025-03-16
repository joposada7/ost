import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
};

// Allow use of process.env
import 'dotenv/config';

export default nextConfig;
