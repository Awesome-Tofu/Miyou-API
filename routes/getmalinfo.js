const express = require("express");
const axios = require("axios");

const route = express.Router();


route.get("/getmalinfo", async (req, res) => {
    const criteria = req.query.criteria;
    const count = req.query.count;
    try {
        const response = await axios(`https://miyou-api-steal.vercel.app/?etc=api%2Fgetmalinfo%3Fcriteria%3D${criteria}%26count%3D${count}`);
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
