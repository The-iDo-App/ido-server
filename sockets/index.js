const { User, Message, Profile, Match } = require('../models');
const { generateToken } = require('../utils');
const mongoose = require('mongoose');

module.exports = (client) => {
  client.on('connection', async function (socket) {
    // Get chats from mongo collection
    socket.on('viewOne', async function (data) {
      //console.log(data);
      let roomId =
        data.from > data.to ? data.from + data.to : data.to + data.from;

      let chats = await Message.find(
        {
          participantIds: {
            $all: [
              mongoose.Types.ObjectId(data.to),
              mongoose.Types.ObjectId(data.from),
            ],
          },
        },
        null,
        { sort: { _id: 1 } }
      );
      let user = await User.findOne({
        _id: mongoose.Types.ObjectId(data.to),
      });
      let profile = await Profile.findOne({
        userId: mongoose.Types.ObjectId(data.to),
      });

      let receiver = {
        picture: profile.picture,
        username: user.username,
      };

      socket.join(roomId);
      socket.emit('showChat', { receiver, chats, first: true });
    });

    // Handle input events
    socket.on('input', async function (data) {
      let { from, to, message, image } = data;

      // Insert message
      let chat = await Message.create({
        senderId: from,
        participantIds: [from, to],
        body: image ? 'sent an image' : message,
        image,
      });

      let user = await User.findOne({ _id: mongoose.Types.ObjectId(from) });
      let profile = await Profile.findOne({
        userId: mongoose.Types.ObjectId(from),
      });

      let sender = {
        _id: from,
        picture: profile.picture,
        username: user.username,
      };

      user = await User.findOne({ _id: mongoose.Types.ObjectId(to) });
      profile = await Profile.findOne({
        userId: mongoose.Types.ObjectId(to),
      });
      let receiver = {
        _id: to,
        picture: profile.picture,
        username: user.username,
      };
      // Send status object
      let roomId = from > to ? from + to : to + from;

      socket.join(roomId);
      // socket.join(receiver.username);

      // Send users and room info
      client.to(roomId).emit('showChat', { receiver, chats: [chat] });

      // let temp = { ...chat._doc, profile };

      // socket.in(roomId).emit('newMessage', { receiver, sender, chats: [temp] });
      // socket.in(to).emit('newMessage', { receiver, sender, chats: [temp] });
    });

    socket.on('viewAllUsers', async function (userId) {
      //console.log(userId);
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
        return {
          ...user,
          latestMessage,
          latestMessageId,
          timeSent,
          myId: userId,
        };
      });

      users.sort((a, b) => {
        return a.latestMessageId > b.latestMessageId ? -1 : 1;
      });

      //console.log(users);
      let matches = await Match.find({
        $and: [
          { participants: { $elemMatch: { userId, isLike: true } } },
          { participants: { $elemMatch: { isLike: true } } },
        ],
      });

      console.log(matches);

      let matchIds = matches.map((match) =>
        match.participants[0].userId.toString() == userId
          ? match.participants[1].userId.toString()
          : match.participants[0].userId.toString()
      );

      // console.log(users);

      users = users.filter((user) => matchIds.includes(user._id.toString()));

      // dont show blocked user
      users = users.filter(
        (user) => current && !current.blockedUsers.includes(user._id)
      );
      socket.emit('showAllUsers', users);
    });
  });
};
