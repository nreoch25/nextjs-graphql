import { Component } from "react";
import { Subscription, Query } from "react-apollo";
import gql from "graphql-tag";
import MessageList from "./MessageList";

const ALL_MESSAGES = gql`
  query {
    allMessages {
      _id
      text
    }
  }
`;

const NEW_MESSAGE = gql`
  subscription {
    newMessage {
      _id
      text
    }
  }
`;

class Messages extends Component {
  render() {
    return (
      <Query query={ALL_MESSAGES}>
        {({ subscribeToMore, data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          const subscribeToNewMessages = () =>
            subscribeToMore({
              document: NEW_MESSAGE,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData) return prev;
                const newMessage = subscriptionData.data.newMessage;
                return Object.assign({}, prev, {
                  allMessages: [newMessage, ...prev.allMessages]
                });
              }
            });
          return (
            <MessageList
              data={data}
              subscribeToNewMessages={subscribeToNewMessages}
            />
          );
        }}
      </Query>
      // <Subscription subscription={NEW_MESSAGE}>
      //   {({ data, error, loading }) => {
      //     if (loading) {
      //       return <p>Loading...</p>;
      //     }
      //     console.log("Message", data);
      //     return <p>New Message Received...</p>;
      //   }}
      // </Subscription>
    );
  }
}

export default Messages;
