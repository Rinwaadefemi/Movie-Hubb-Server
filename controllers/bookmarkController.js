const Movie = require("../models/movie");
const { use } = require("../routes/authRouter");
const customError = require("../utils/customError");

//======== Controller to find all the bookmarked movies ======

const allBookmarks = async (req, routes) => {
  const { userId } = req.user;
  const bookmarks = await Movie.find({ bookmarkBy: userId });
  res.status(200).json({ data: bookmarks });
};

//======== Controller to add a movie to bookmark ======

const addBookmark = async (req, res) => {
  const { id } = req.params;

  const { userId } = req.user;

  //   function for bookmarked shows - to find the shows
  const bookmarkedShows = await Movie.findOneAndUpdate(
    { _id: id },
    { $push: { bookmarkBy: userId } }
  );

  if (!bookmarkedShows) {
    return next(customError(`No Movie with ID: ${id}`, 400));
  }

  res.status(200).json({ message: "Movie Bookmarked!" });
};

//======== Controller to remove a movie from bookmark ======

const removeBookmark = async () => {
  // destructure to call out the id
  const { id } = req.params;

  // destructure to call out the user of the account
  const { userId } = req.user;

  //  function for bookmarked shows - to find the shows
  const bookmarkedShows = await Movie.findOneAndUpdate(
    //identify the id from mongo db
    { _id: id },
    { $pull: { bookmarkBy: userId } }
  );

  //error handling
  if (!bookmarkedShows) {
    return next(customError(`No Movie with ID: ${id}`, 400));
  }

  res.status(200).json({ message: "Bookmark Removed!" });
};

module.exports = { allBookmarks, addBookmark, removeBookmark };
