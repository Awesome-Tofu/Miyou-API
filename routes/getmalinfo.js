const express = require("express");
const axios = require("axios");

const route = express.Router();


route.get("/getmalinfo", async (req, res) => {
    const criteria = req.query.criteria;
    const count = req.query.count;
    try {
          let query = `
    query($page: Int, $perPage: Int, $status: MediaStatus, $sort: [MediaSort], $format: MediaFormat) {
      Page(page: $page, perPage: $perPage) {
        media(status: $status, sort: $sort, format: $format, type: ANIME) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            medium
            large
          }
          rankings {
            rank
          }
        }
      }
    }
  `;

  // Define the variables and adjust based on criteria
  let variables = {
    page: 1,
    perPage: count,
    sort: ['POPULARITY_DESC'], // Default sorting by popularity
  };

  // Adjust based on the criteria
  switch (criteria.toLowerCase()) {
    case 'movie':
      variables.format = 'MOVIE'; // Fetch only movies
      variables.sort = ['SCORE_DESC']; // Sort movies by average score
      break;
    case 'favorite':
      variables.format = 'TV'; // Fetch TV anime
      variables.sort = ['FAVOURITES_DESC']; // Fetch most favorited anime
      break;
    case 'all':
      variables.format = 'TV'; // Fetch all TV anime
      variables.sort = ['SCORE_DESC']; // Sort by average score
      break;
    case 'bypopularity':
      variables.sort = ['POPULARITY_DESC']; // Sort by popularity
      break;
    case 'airing':
      variables.status = 'RELEASING'; // Fetch currently airing anime
      variables.sort = ['POPULARITY_DESC'];
      break;
    default:
      variables.status = 'RELEASING'; // Default to airing if no match
      break;
  }

  try {
    // Send the POST request to the AniList GraphQL API using axios
    const response = await axios.post('https://graphql.anilist.co', {
      query: query,
      variables: variables,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Format the response to include a "node" structure and ranking object
    const formattedResponse = response.data.data.Page.media.map((media, index) => ({
      node: {
        id: media.id,
        title: media.title.romaji || media.title.english || media.title.native,
        main_picture: {
          medium: media.coverImage.medium,
          large: media.coverImage.large,
        },
      },
      ranking: {
        rank: index + 1, // Sequential ranking within the result
      },
    }));

     res.status(200).json({ data: formattedResponse });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            error: error.message
        });
    }
});

module.exports = route;
