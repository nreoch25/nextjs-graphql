import { Component, Fragment } from "react";
import { subscription } from "react-apollo";
import { gql } from "graphql-tag";

const MESSAGES_SUBSCRIPTION = gql`
  subscription {
    newMessage {
      text
    }
  }
`;

class Messages extends Component {
  render() {
    return (
      <Fragment>
        <h1>Messages</h1>
      </Fragment>
    );
  }
}
