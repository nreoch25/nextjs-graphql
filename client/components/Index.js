import { Component, Fragment } from "react";
import MessageForm from "./MessageForm";
import Messages from "./Messages";

class Index extends Component {
  render() {
    return (
      <Fragment>
        <h1>NextJS GraphQL</h1>
        <MessageForm />
        <Messages />
      </Fragment>
    );
  }
}

export default Index;
