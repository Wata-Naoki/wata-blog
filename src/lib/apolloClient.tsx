import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://wata-blog.hasura.app/v1/graphql",
    }),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
};
