const express = require("express");

const {
  allShows,
  allMovies,
  allSeries,
} = require("../controllers/movieController");
const methodNotAllowed = require("../utils/methodNotAllowed");

const router = express.Router();

router.route("/").get(allShows).all(methodNotAllowed);

//all the series will have a slash of /series
router.route("/series").get(allSeries).all(methodNotAllowed);

//all the movies will have a slash of /movies
router.route("/movies").get(allMovies).all(methodNotAllowed);

//then export
module.exports = router;
