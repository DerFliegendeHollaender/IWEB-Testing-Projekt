import express from "express";
import { router as movieRouter } from "./backend/movie/movie.routes.js";
import mongoose from "mongoose";

const app = express();

mongoose.connect("mongodb://127.0.0.1/movies-collection");

app.use(express.static("frontend"));

app.use(express.json());
app.use("/api/movie", movieRouter);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(3001, () => {
    console.log("Server listens to http://localhost:3001");
  });
});
