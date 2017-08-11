import {ApolloClient, createNetworkInterface, IntrospectionFragmentMatcher} from 'apollo-client';


const token = 'cd620340b5afcd5ad60853fcaac013808d6841ee';

const myFragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: 'OBJECT',
          name: 'ISSUE',
          possibleTypes: [
            { name: 'Issue' }
          ],
        },
      ],
    },
  }
});

const networkInterface = createNetworkInterface({
  uri: 'https://api.github.com/graphql'
});

const client = new ApolloClient({
  fragmentMatcher: myFragmentMatcher,
  networkInterface
});


networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    req.options.headers['Authorization'] = 'bearer ' + token;
    next();
  }
}]);

export function provideClient(): ApolloClient {
  return client;
}
