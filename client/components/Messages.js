import { Component } from "react";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";

const NEW_MESSAGE = gql`
  subscription {
    newMessage {
      text
    }
  }
`;

class Messages extends Component {
  render() {
    return (
      <Subscription subscription={NEW_MESSAGE}>
        {({ data, error, loading }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          console.log("Message", data);
          return <p>New Message Received...</p>;
        }}
      </Subscription>
    );
  }
}

export default Messages;
