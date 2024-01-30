const express = require("express");
const axios = require("axios");

const route = express.Router();


route.get("/getmixlinks", async (req, res) => {
    const id = req.query.id;
    const ep = req.query.ep;
    try {
        const response = await axios(`https://miyou-api-steal.vercel.app/?etc=api%2Fgetmixlinks%3Fid%3D${id}%26ep%3D${ep}`);
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
