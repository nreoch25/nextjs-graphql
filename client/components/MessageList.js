import { Component, Fragment } from "react";

class MessageList extends Component {
  componentDidMount() {
    this.props.subscribeToNewMessages();
  }
  render() {
    const { data } = this.props;
    return (
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {data.allMessages.map(message => (
          <p key={message._id}>{message.text}</p>
        ))}
      </ul>
    );
  }
}

export default MessageList;
