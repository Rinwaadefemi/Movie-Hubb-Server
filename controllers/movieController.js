const Movie = require("../models/movie");

//======== Controller to find all movies and series (shows) ========
const allShows = async (req, res) => {
  const shows = await Movie.find({});
  res.status(200).json({ shows: shows });
};

//======== Controller to find only all the series (allSeries) ========
const allSeries = async (req, res) => {
  const series = await Movie.find({ type: "series" });
  res.status(200).json({ shows: series });
};

//======== Controller to find only all the movies (allMovies) ========
const allMovies = async (req, res) => {
  const movies = await Movie.find({ type: "movie" });
  res.status(200).json({ shows: movies });
};

module.exports = { allShows, allSeries, allMovies };
