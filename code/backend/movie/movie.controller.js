import { model as Movie } from "./movie.model.js";

async function getMovies(request, response) {
  await Movie.find()
    .exec()
    .then((Movies) => {
      response.json(Movies);
    });
}

async function createMovie(request, response) {
  await Movie.create({
    name: request.body.name,
    year: request.body.year,
    genre: request.body.genre,
    director: request.body.director,
    actors: request.body.actors,
    description: request.body.description,
    asset: request.body.asset,
    belongsToMyCollection: request.body.belongsToMyCollection,
  }).then((Movie) => {
    response.json(Movie);
  });
}

async function checkThatMovieExists(movie) {
  const movieId = movie.responsible;
  return Movie.findById(movieId)
    .exec()
    .then((foundMovie) => {
      if (!foundMovie) {
        return Promise.reject({
          message: `Movie with id ${movieId} does not exist.`,
          status: 404,
        });
      }
    });
}

async function updateMovie(request, response) {
  const updatedMovie = request.body;
  await checkThatMovieExists(updatedMovie)
    .then((movie) => {
      movie.belongsToMyCollection = updatedMovie.belongsToMyCollection;
      return movie.save();
    })
    .then((savedMovie) => {
      response.json(savedMovie);
    })
    .catch((error) => {
      handleError(error, response);
    });
}

export { getMovies, createMovie, updateMovie };
