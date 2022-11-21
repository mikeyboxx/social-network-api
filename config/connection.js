require('dotenv').config();
const mongoose = require('mongoose');

// Wrap Mongoose around local connection to MongoDB
mongoose.connect(`mongodb://${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_USER}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export connection
module.exports = mongoose.connection;
