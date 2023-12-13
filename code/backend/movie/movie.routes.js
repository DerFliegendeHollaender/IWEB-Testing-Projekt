import { Router } from "express";
import { getMovies, createMovie, updateMovie } from "./movie.controller.js";

const router = Router();

router.get("/", getMovies);
router.post("/", createMovie);
router.put("/:id", updateMovie);

export { router };
