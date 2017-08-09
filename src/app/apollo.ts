import { ApolloClient, createBatchingNetworkInterface } from 'apollo-client';

const networkInterface = createBatchingNetworkInterface({
  uri: '/graphql',
  batchInterval: 10
});

const client = new ApolloClient({
  networkInterface
});

export function provideClient(): ApolloClient {
  return client;
}
