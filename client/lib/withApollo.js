import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
import config from "../config";

function createClient({ headers }) {
  const endpoint = process.browser
    ? config.clientEndpoint
    : config.serverEndpoint;
  return new ApolloClient({
    uri: endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include"
        },
        headers
      });
    }
  });
}

export default withApollo(createClient);
