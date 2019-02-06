const Query = {
  allMessages: async (parent, args, { Message }) => {
    return await Message.find({})
  }
}

module.exports = Query;