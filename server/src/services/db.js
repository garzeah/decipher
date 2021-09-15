const mongoose = require("mongoose");

// Mongoose event listeners
mongoose.connection.once("open", () => {
  console.log("Connected to our Mongo database");
});

mongoose.connection.on("error", (error) => {
  console.error(error);
});

const mongoConnect = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
};

const mongoDisconnect = async () => await mongoose.disconnect();

module.exports = {
  mongoConnect,
  mongoDisconnect
};
