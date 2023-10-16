const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const path = require("path");

const getEnvConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      APOLLO_API: "https://api3.myperfectfit.co.in:5679/graphql",
      //APOLLO_API: "http://103.7.64.85:5679/graphql",
    };
  }
  return {
    APOLLO_API: "https://api3.myperfectfit.co.in:5679/graphql",
  };
};

module.exports = (phase) => {
  const envConfig = getEnvConfig(phase);
  return {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.resolve.alias["@"] = path.resolve(__dirname);
      return config;
    },
    experimental: {
      esmExternals: "loose",
    },
    images: {
      domains: [
        "mpf-public-data.s3.ap-south-1.amazonaws.com",
        "images.myperfectfit.co.in:3080",
        "lh3.googleusercontent.com",
        "dsdi4dt428hzp.cloudfront.net",
      ],
    },
    env: envConfig,
  };
};
