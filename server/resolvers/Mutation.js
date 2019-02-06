const Mutation = {
  async postMessage(parent, args, { Message, pubsub }) {
    const newMessage = new Message({
      ...args.input
    })
    pubsub.publish("message-added", { newMessage })
    return await newMessage.save();

  }
}

module.exports = Mutation;