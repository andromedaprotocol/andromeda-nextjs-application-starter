import { StrictTypedTypePolicies, TypedFieldPolicy } from "@andromedaprotocol/gql";
import { ApolloClient, InMemoryCache } from "@apollo/client";


/**
 * Apollo GQL client for querying andromeda graphql server.
 * @andromedaprotocol/gql provides types and auto generated queries, its highly recommended you use
 * it for development. However, you can write your custom gql queries also
 */
export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  'defaultOptions': {
    'query': {
      'notifyOnNetworkStatusChange': true,
      'fetchPolicy': 'cache-first'
    }
  },
  ssrMode: true,
  ssrForceFetchDelay: 500,
  cache: new InMemoryCache({
    typePolicies: {
      ...TypedFieldPolicy,
      ChainConfig: {
        keyFields: ['chainId']
      },
      ChainConfigQuery: {
        merge: true
      },
    } as StrictTypedTypePolicies
  }),
});
