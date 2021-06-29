const { User, Message, Profile } = require('../models');
const mongoose = require('mongoose');

module.exports = (client) => {
  client.on('connection', async function (socket) {
    // Get chats from mongo collection
    // socket.on('viewOne', async function (data) {
    //   let roomId =
    //     data.from > data.to ? data.from + data.to : data.to + data.from;

    //   let chats = await Chat.find({}, null, { sort: { _id: 1 } })
    //     .populate('from', ['username'])
    //     .populate('to', ['username']);

    //   let receiver = await User.findOne({ username: data.to });

    //   chats = chats.filter((chat) => {
    //     return (
    //       chat.from &&
    //       chat.to &&
    //       ((chat.from.username === data.from && chat.to.username === data.to) ||
    //         (chat.from.username === data.to && chat.to.username === data.from))
    //     );
    //   });

    //   console.log(chats);

    //   socket.join(roomId);
    //   socket.emit('showChat', { receiver, chats, first: true });
    // });

    // Handle input events
    // socket.on('input', async function (data) {
    //   let { from, to, message } = data;

    //   let receiver = await User.findOne({ username: to });
    //   let sender = await User.findOne({ username: from });

    //   // Insert message
    //   let chat = await Chat.create({
    //     from: sender._id,
    //     to: receiver._id,
    //     message,
    //   });

    //   chat = await chat
    //     .populate('from', ['username'])
    //     .populate('to', ['username'])
    //     .execPopulate();

    //   // Send status object
    //   let roomId = from > to ? from + to : to + from;

    //   socket.join(roomId);
    //   // socket.join(receiver.username);

    //   // Send users and room info
    //   client.to(roomId).emit('showChat', { receiver, chats: [chat] });

    //   chat.message = from + ': ' + chat.message;
    //   socket.in(roomId).emit('newMessage', { receiver, sender, chats: [chat] });
    //   socket
    //     .in(receiver.username)
    //     .emit('newMessage', { receiver, sender, chats: [chat] });
    // });

    socket.on('viewAllUsers', async function (userId) {
      socket.join(userId);
      let users = await User.find({
        _id: { $ne: mongoose.Types.ObjectId(userId) },
      });
      let profiles = await Profile.find({
        _id: { $ne: mongoose.Types.ObjectId(userId) },
      });
      let current = await User.findOne({
        _id: mongoose.Types.ObjectId(userId),
      });
      let profile = await Profile.findOne({
        userId: mongoose.Types.ObjectId(userId),
      });

      users = users.map((user) => {
        let roomId = userId > user._id ? userId + user._id : user._id + userId;
        socket.join(roomId);
        let temp = profiles.filter(
          (profile) => profile.userId.toString() == user._id.toString()
        );
        picture = temp.length ? temp[0].picture : {};
        return {
          _id: user._id,
          username: user.username,
          picture,
        };
      });

      // get lahat ng chat na involve si user
      let chats = await Message.find(
        {
          participantIds: mongoose.Types.ObjectId(userId),
        },
        null,
        { sort: { _id: -1 } }
      );

      users = users.map((user) => {
        let latestMessage = '',
          latestMessageId = '',
          timeSent;
        chats.map((chat) => {
          if (
            !latestMessage &&
            chat &&
            chat.participantIds
              .map((id) => id.toString())
              .includes(user._id.toString())
          ) {
            latestMessage = chat.body;
            latestMessageId = chat._id;
            timeSent = chat.timeSent;
          }
        });
        return { ...user, latestMessage, latestMessageId, timeSent };
      });

      users.sort((a, b) => {
        return a.latestMessageId > b.latestMessageId ? -1 : 1;
      });

      socket.emit('showAllUsers', users);
    });
  });
};
