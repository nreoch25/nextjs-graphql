import { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const POST_MESSAGE = gql`
  mutation postMessage($input: PostMessageInput!) {
    postMessage(input: $input) {
      text
    }
  }
`;

class MessageForm extends Component {
  render() {
    return (
      <Mutation mutation={POST_MESSAGE}>
        {(postMessage, { data, loading, error }) => {
          const handleSubmit = evt => {
            evt.preventDefault();
            const text = evt.target.text.value;
            if (!text) return;
            postMessage({
              variables: {
                input: {
                  text
                }
              }
            });
            event.target.text.value = "";
          };
          return (
            <form onSubmit={handleSubmit}>
              <input type="text" name="text" placeholder="Type message" />
              <button type="submit">Send Message</button>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default MessageForm;
