const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve frontend folder
app.use(
    express.static(
        path.join(__dirname, "frotend")
    )
);

// Import Routes
const userRoutes =
require("./routes/userRoutes");

const requestRoutes =
require("./routes/requestRoutes");

// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        message:
        "Skill Swap API Running"
    });
});

// API Routes
app.use("/users", userRoutes);
app.use("/requests", requestRoutes);

// 404 Route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message:
        "Route not found"
    });
});

// Server
app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});