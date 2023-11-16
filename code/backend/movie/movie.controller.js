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
  }).then((Movie) => {
    response.json(Movie);
  });
}

async function removeMovie(request, response) {
  const MovieId = request.params.id;
  await Movie.findById(MovieId)
    .exec()
    .then(async (Movie) => {
      if (!Movie) {
        return Promise.reject({
          message: `Movie with id ${MovieId} not found.`,
          status: 404,
        });
      }
      const foundTodos = await Todo.find({
        responsible: Movie._id,
      }).exec();
      if (foundTodos && foundTodos.length > 0) {
        return Promise.reject({
          message: `Todos still assigned to Movie with id ${MovieId}.`,
          status: 404,
        });
      }
      return Movie.deleteOne();
    })
    .then((Movie) => {
      response.json(Movie);
    })
    .catch((error) => {
      if (error.status) {
        response.status(error.status);
      } else {
        response.status(500);
      }
      response.json({ message: error.message });
    });
}

export { getMovies, createMovie, removeMovie };
