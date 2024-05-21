const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./Middleware/errorMiddleware");
const applyjobRoutes = require("./routes/applyjobRoutes");
const jobsRoutes = require("./routes/jobsRoutes");

const app = express();
//MongoDB conection
dotenv.config();
connectDatabase();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/applyjobs", applyjobRoutes);
app.use("/api/jobs", jobsRoutes);

// app.use('/api/', userRoutes);

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 4000;

app.listen(
  PORT,
  console.log(`Server is Running on http://localhost:${process.env.PORT}`)
);
