const dotenv = require('dotenv');
const express = require("express");
dotenv.config();
const cors = require("cors");
const axios = require("axios"); 

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.get("/api/quiz", async (req, res) => {
    try {
        const response = await axios.get("https://api.jsonserve.com/Uw5CrX");
        res.status(200).json({
            success: true,
            message: "Successfully fetch the quiz data",
            data: response.data,
        });
    } catch (error) {
        console.error("Error fetching quiz data:", error);
        res.status(500).json({ 
            success: false,
            message: error.message|| "Failed to fetch quiz data" ,
            error:  error
        });
    }
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
