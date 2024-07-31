const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  const { sender, receiver, content } = req.body;

  try {
    const message = new Message({ sender, receiver, content });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getMessages = async (req, res) => {
  const { sender, receiver } = req.query;

  try {
    const messages = await Message.find({ sender, receiver }).exec();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
