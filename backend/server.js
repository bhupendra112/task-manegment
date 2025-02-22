const express = require("express");
const cors = require("cors")
const app = express();
const port = process.env.PORT || 5000
require("dotenv").config();
require("./conn/conn")
app.use(cors(
    origin:'https://task-manegment-1.onrender.com',
))
    // Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./Router/user");
const taskRouter = require("./Router/task")
app.use("/api/user", userRoutes);
app.use("/api/task", taskRouter);

app.listen(port, () => console.log("Server running on port 5000"));
