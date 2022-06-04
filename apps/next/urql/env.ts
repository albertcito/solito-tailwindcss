const getGraphqlUrl = () => {
  if (!process.env.NEXT_PUBLIC_GRAPHQL_URL) {
    throw new Error('NEXT_PUBLIC_GRAPHQL_URL is required in .env file');
  }
  return process.env.NEXT_PUBLIC_GRAPHQL_URL;
};

const getAppUrl = () => {
  if (!process.env.NEXT_PUBLIC_APP_URL) {
    throw new Error('NEXT_PUBLIC_APP_URL is required in .env file');
  }
  return process.env.NEXT_PUBLIC_APP_URL;
};

const env = {
  graphqlURL: getGraphqlUrl(),
  appURL: getAppUrl(),
  gAnalytics: process.env.NEXT_PUBLIC_GANALYTICS,
};

export default env;
