const { loadMovies } = require("./main.js");

describe("loadMovies", () => {
  it("should load movies into wholeMovieList", () => {
    loadMovies();
    expect(wholeMovieList.length).toBeGreaterThan(0);
  });

  it("should set needMoviesToBeLoaded to false", () => {
    loadMovies();
    expect(needMoviesToBeLoaded).toBe(false);
  });
});
