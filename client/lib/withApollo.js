import withApollo from "next-with-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import config from "../config";

const endpoint = process.browser
  ? config.clientEndpoint
  : config.serverEndpoint;

function createClient() {
  const cache = new InMemoryCache();
  const httpLink = new HttpLink({ uri: endpoint });
  const wsLink = process.browser
    ? new WebSocketLink({
        uri: "ws://localhost/graphql",
        options: {
          reconnect: true
        }
      })
    : () => {
        console.log("SSR");
      };
  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return (
        kind === "OperationDefinition" &&
        operation === "subscription" &&
        process.browser
      );
    },
    wsLink,
    httpLink
  );

  return new ApolloClient({
    link,
    cache
  });
}

export default withApollo(createClient);
