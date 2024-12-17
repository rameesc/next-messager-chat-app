/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images:{
    remotePatterns:[
      {
                protocol:"https",
                hostname:'**'
              }
    ]
  }
};

module.exports = nextConfig;


// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images:{
//     remotePatterns:[
//       {
//         protocol:"https",
//         hostname:'**'
//       }
//     ]
//   }
// };

// export default nextConfig;
