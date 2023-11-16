import { Router } from "express";
import { getMovies, createMovie, removeMovie } from "./movie.controller.js";

const router = Router();

router.get("/", getMovies);
router.post("/", createMovie);
router.delete("/:id", removeMovie);

export { router };
