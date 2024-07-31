const express = require('express');
const mongoose = require('mongoose');
const chatRoutes = require('./routes/chat');

const createChatApp = (config) => {
  const app = express();

  app.use(express.json());
  app.use('/chat', chatRoutes);

  const startServer = async () => {
    try {
      await mongoose.connect(config.mongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Connected to MongoDB');

      app.listen(config.port || 3000, () => {
        console.log(`Server running on http://localhost:${config.port || 3000}`);
      });
    } catch (error) {
      console.error('Database connection error:', error);
      process.exit(1);
    }
  };

  startServer();
  return app;
};

module.exports = createChatApp;
