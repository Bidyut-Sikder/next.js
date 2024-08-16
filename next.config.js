const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */


const nextConfig = (phase) => {

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        MONGODB_URL: "mongodb://localhost:27017/blog",
      },
      images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
          },
        ],
      },
    };
  }

  return {
    env: {
      MONGODB_URL:
        "mongodb+srv://bidyutsikder420:bidyutkumar@cluster0.mbahdsf.mongodb.net/blog",
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
        },
      ],
    },
  };
};

module.exports = nextConfig;
