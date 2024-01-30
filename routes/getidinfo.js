const express = require("express");
const axios = require("axios");

const route = express.Router();


route.get("/getidinfo", async (req, res) => {
    let malId = req.query.malId;
    try {
        const response = await axios(`https://miyou-api-steal.vercel.app/?etc=api%2Fgetidinfo%3FmalId%3D${malId}`);
        const data = response.data;
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(404).json({
            error: error.message
        });
    }
});

module.exports = route;
