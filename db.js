const mongoose = require("mongoose");

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.dbName,
  };

  try {
    const url = process.env.DB;
    mongoose.connect(url.toString(), connectionParams);
    console.log("Connected To DB successfully");
  } catch (error) {
    console.error(error, "could not connect to db");
  }
};
