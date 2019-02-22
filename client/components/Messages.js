import { Component } from "react";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";

const MESSAGES_SUBSCRIPTION = "hey";

class Messages extends Component {
  render() {
    return (
      // <Subscription subscription={MESSAGES_SUBSCRIPTION}>
      //   {({ data: { newMessage }, loading }) => {
      //     if (loading) {
      //       return <p>Loading...</p>;
      //     }
      //     console.log("Message", newMessage);
      //     return <p>New Message Received...</p>;
      //   }}
      // </Subscription>
      <p>Messages</p>
    );
  }
}

export default Messages;
