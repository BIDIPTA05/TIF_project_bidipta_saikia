const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Import routes
const userRoutes = require("./routes/user");
const communityRoutes = require("./routes/community");
const roleRoutes = require("./routes/role");
const memberRoutes = require("./routes/member");

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/your-database-name")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/v1", userRoutes);
app.use("/v1", communityRoutes);
app.use("/v1", roleRoutes);
app.use("/v1", memberRoutes);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Handle 500 errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
