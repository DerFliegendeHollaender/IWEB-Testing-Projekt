import {
  waitFor,
  waitForElementToBeRemoved,
  getByText,
  getByTestId, // Add any other utility functions you might need
} from "@testing-library/dom";

import * as axiosModule from "../scripts/libs/axios.min.js";
jest.mock("../scripts/libs/axios.min.js");

// Import your main module here
import "../scripts/main";

function setUpDom() {
  document.body.innerHTML = `
    <h1>Movie Collection</h1>
    <div class="nav">
      <div class="search" id="search">
        <input type="text" id="search-input" placeholder="Search..." />
        <button id="search-btn">Search</button>
      </div>
      <div class="buttons">
        <button id="new-movies-btn">New Movies</button>
        <button id="my-movies-btn">My Movies</button>
      </div>
    </div>
    <div id="popup" class="popup hidden"></div>
    <div id="data"></div>
    <div id="notification" class="do-not-display"></div>
    <div class="input-section">
      <input type="text" id="vendor" />
      <input type="text" id="price" />
      <button id="add-offering">Hinzufügen</button>

      <select id="select-vendor"></select>
      <input type="text" id="new-price" />
      <button id="change-price">Ändern</button>
    </div>

    <table id="price-table">
      <thead>
        <tr>
          <th>Anbieter</th>
          <th>Preis</th>
          <th></th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    <script src="scripts/libs/axios.min.js"></script>
    <script type="module" src="scripts/main.js"></script>`;
}

describe("Movie Management", () => {
  beforeEach(() => {
    setUpDom();
  });

  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  test("loading movies successfully", async () => {
    // Given
    const moviesToLoad = [
      {
        name: "Movie1",
        belongsToMyCollection: true /* add other properties */,
      },
      {
        name: "Movie2",
        belongsToMyCollection: false /* add other properties */,
      },
      // Add more movie objects as needed
    ];
    axiosModule.get.mockResolvedValue({ data: moviesToLoad });

    // When
    loadMovies();

    // Then
    await waitFor(() => {
      // Check that the movies are displayed on the page
      moviesToLoad.forEach((movie) => {
        expect(
          getByText(document.getElementById("data"), movie.name)
        ).toBeInTheDocument();
      });
    });
  });

  test("adding a movie successfully", async () => {
    // Given
    const newMovie = {
      name: "NewMovie",
      belongsToMyCollection: false /* add other properties */,
    };
    const updatedMovies = [...wholeMovieList, newMovie];

    axiosModule.put.mockResolvedValue({ data: newMovie });

    // When
    addMovie(updatedMovies.length);

    // Then
    await waitFor(() => {
      // Check that the movie is now in the user's collection
      expect(
        getByText(document.getElementById("data"), newMovie.name)
      ).toBeInTheDocument();
    });
  });

  test("removing a movie successfully", async () => {
    // Given
    const movieToRemove = {
      name: "MovieToRemove",
      belongsToMyCollection: true /* add other properties */,
    };
    const updatedMovies = wholeMovieList.filter(
      (movie) => movie.name !== movieToRemove.name
    );

    axiosModule.put.mockResolvedValue({ data: movieToRemove });

    // When
    removeMovie(wholeMovieList.indexOf(movieToRemove) + 1);

    // Then
    await waitForElementToBeRemoved(() =>
      getByText(document.getElementById("data"), movieToRemove.name)
    );
  });
});
