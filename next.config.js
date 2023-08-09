/** @type {import('next').NextConfig} */

// const remotePatterns =
//   process.env.NODE_ENV == "development"
//     ? [
//         {
//           protocol: "https",
//           hostname: "**",
//         },
//       ]
//     : [];

const nextConfig = {
  images: {
    remotePatterns: [],
  },
};

module.exports = nextConfig;
