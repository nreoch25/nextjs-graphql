import withApollo from "next-with-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { split } from "apollo-link";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import config from "../config";

const endpoint = process.browser
  ? config.clientEndpoint
  : config.serverEndpoint;

function createClient() {
  const httpLink = new HttpLink({ uri: endpoint });
  const subClient = new SubscriptionClient("ws://localhost/graphql", {
    reconnect: true
  });
  const wsLink = new WebSocketLink(subClient);
  const link = process.browser
    ? split(
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query);
          return kind === "OperationDefinition" && operation === "subscription";
        },
        wsLink,
        httpLink
      )
    : httpLink;
  const cache = new InMemoryCache();
  return new ApolloClient({
    link,
    cache
  });
}

export default withApollo(createClient);
