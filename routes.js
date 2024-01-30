const express = require("express");
const route = express.Router();

// Import routes
const searchRoute = require("./routes/search");
const animeInfo = require("./routes/animeInfo");
const getAnime = require("./routes/getAnime");
const getLinks = require("./routes/getLinks");
const getIdInfo = require("./routes/getidinfo");
const getMalInfo = require("./routes/getmalinfo");
const getMixLinks = require("./routes/getmixlinks");

route.use("/", searchRoute); // /api/search?name=demon slayer
route.use("/", animeInfo); // /api/popular?count=10
route.use("/", getAnime);
route.use("/", getLinks);
route.use("/", getIdInfo);
route.use("/", getMalInfo);
route.use("/", getMixLinks);

module.exports = route;
