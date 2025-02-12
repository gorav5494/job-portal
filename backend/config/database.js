const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    // Use DB_URI from env or fallback to local MongoDB
    const mongoURI =
      process.env.DB_URI || "mongodb://localhost:27017/jobPortal";

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      socketTimeoutMS: 45000,
      family: 4,
    };

    const conn = await mongoose.connect(mongoURI, options);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Connection success handlers
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB");
    });

    // Connection error handlers
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    // Handle application termination
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  } catch (error) {
    console.error("Database connection error:", error);

    // More detailed error handling
    if (error.name === "MongoServerSelectionError") {
      console.error(
        "Could not connect to MongoDB server. Please check if MongoDB is running."
      );
    }
    if (error.name === "MongoParseError") {
      console.error("Invalid MongoDB connection string.");
    }

    process.exit(1);
  }
};

module.exports = connectDatabase;
