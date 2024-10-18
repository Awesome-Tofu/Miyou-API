const express = require("express");
const axios = require("axios");

const route = express.Router();

route.get("/getidinfo", async (req, res) => {
  let malId = req.query.malId;
  try {
    const resJson = {};
    const response = await axios(
      `https://api.malsync.moe/mal/anime/anilist:${malId}`
    );
    const gogoData = response.data.Sites?.Gogoanime;
    if (!gogoData) {
      return res.status(404).json({ error: "No data found" });
    }
    const keys = Object.keys(gogoData);
    const isDub = keys.length > 1;
    resJson["isDub"] = isDub;

    let subLink, dubLink;

    if (isDub) {
      subLink = gogoData[keys.find((key) => !key.includes("dub"))].identifier;
      resJson["subLink"] = subLink;
      dubLink = gogoData[keys.find((key) => key.includes("dub"))].identifier;
      resJson["dubLink"] = dubLink;
      const subRes = await axios(
        `https://tofu-consumet.vercel.app/anime/gogoanime/info/${subLink}`
      );
      resJson["subTotalEpisodes"] = subRes.data.totalEpisodes;
      const dubRes = await axios(
        `https://tofu-consumet.vercel.app/anime/gogoanime/info/${dubLink}`
      );
      resJson["dubTotalEpisodes"] = dubRes.data.totalEpisodes;
    } else {
      subLink = gogoData[keys[0]].identifier;
      const subRes = await axios(
        `https://tofu-consumet.vercel.app/anime/gogoanime/info/${subLink}`
      );
      resJson["subTotalEpisodes"] = subRes.data.totalEpisodes;
    }

    return res.status(200).json(resJson);
  } catch (error) {
    console.error(error);
    res.status(404).json({
      error: error.message,
    });
  }
});

module.exports = route;
