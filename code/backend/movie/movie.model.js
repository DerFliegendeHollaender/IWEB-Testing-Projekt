import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  actors: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  asset: {
    type: String,
    required: true,
  },
  belongsToMyCollection: {
    type: Boolean,
    required: true,
  },
});

const model = mongoose.model("movies", movieSchema);

export { model };
