import {ApolloClient, createNetworkInterface, IntrospectionFragmentMatcher} from 'apollo-client';


const token = '';

// Should be fixed
const myFragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: 'OBJECT',
          name: 'Issue',
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
      req.options.headers = {};
    }
    req.options.headers['Authorization'] = 'bearer ' + token;
    next();
  }
}]);

export function provideClient(): ApolloClient {
  return client;
}
