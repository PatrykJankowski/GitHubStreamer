/*
import {ApolloClient, createBatchingNetworkInterface, createNetworkInterface} from 'apollo-client';

/!*const networkInterface = createBatchingNetworkInterface({
  uri: 'https://api.github.com/graphql',
  batchInterval: 10
});*!/



const networkInterface = createBatchingNetworkInterface({
  uri: 'https://api.github.com/graphql',
  batchInterval: 10,
  opts: {
    // Options to pass along to `fetch`
  }
});
const token = 'bearer cd620340b5afcd5ad60853fcaac013808d6841ee';
const authMiddleware = {
  applyBatchMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    req.options.headers['authorization'] = token;
    next();
  }
}
const loggingAfterware = {
  applyBatchAfterware(res, next) {
    console.log(res.responses);
    next();
  }
}
networkInterface.use([authMiddleware]);
networkInterface.useAfter([loggingAfterware]);




/!*const networkInterface = createBatchingNetworkInterface({
  uri: 'https://api.github.com/graphql',
  batchInterval: 10,
  opts: {
    credentials: 'cd620340b5afcd5ad60853fcaac013808d6841ee'
  }
});*!/

/!*networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    req.options.headers['Authorization'] = 'cd620340b5afcd5ad60853fcaac013808d6841ee';
    next();
  }
}]);*!/



const client = new ApolloClient({
  networkInterface
});

export function provideClient(): ApolloClient {
  return client;
}
*/
