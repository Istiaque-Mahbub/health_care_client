 const config = {
  env: process.env.NODE_ENV,

  baseApiUrl: process.env.NEXT_PUBLIC_BASE_API_URL,

  jwtSecret: process.env.JWT_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
};

export default config;
