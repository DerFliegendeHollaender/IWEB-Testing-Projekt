const wholeMovieList = [];
let myMovies = [];
let newMovies = [];
let needMoviesToBeLoaded = false;

function loadMovies() {
  myMovies = [];
  newMovies = [];
  let myMoviesCycle = 0;
  let newMoviesCycle = 0;
  axios.get("http://localhost:3001/api/movie").then((response) => {
    const movies = response.data;
    const elDivMovies = document.getElementById("data");
    elDivMovies.innerHTML = "";
    if (wholeMovieList.length < 1) {
      needMoviesToBeLoaded = true;
    } else {
      needMoviesToBeLoaded = false;
    }
    for (let i = 0; i < movies.length; i++) {
      if (needMoviesToBeLoaded) {
        wholeMovieList.push(movies[i]);
      }
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      if (urlParams.has("belongsToMyCollection")) {
        switch (urlParams.get("belongsToMyCollection")) {
          case "true":
            if (movies[i].belongsToMyCollection == true) {
              myMoviesCycle += 1;
              myMovies.push(movies[i]);
              const elDiv = document.createElement("div");
              elDiv.setAttribute("id", "movie" + myMoviesCycle);
              elDiv.classList.add("movie");
              const elH3 = document.createElement("h3");
              elH3.classList.add("name");
              elH3.textContent = movies[i].name;
              const elImg = document.createElement("img");
              elImg.src = movies[i].asset;

              // const elP = document.createElement("p");
              // elP.textContent = movie.description;
              elDiv.appendChild(elH3);
              elDiv.appendChild(elImg);
              // elDiv.appendChild(elP);
              elDivMovies.appendChild(elDiv);
            }
            break;
          case "false":
            if (movies[i].belongsToMyCollection == false) {
              newMoviesCycle += 1;
              newMovies.push(movies[i]);
              const elDiv = document.createElement("div");
              elDiv.setAttribute("id", "movie" + newMoviesCycle);
              elDiv.classList.add("movie");
              const elH3 = document.createElement("h3");
              elH3.textContent = movies[i].name;
              elH3.classList.add("name");
              const elImg = document.createElement("img");
              elImg.src = movies[i].asset;

              // const elP = document.createElement("p");
              // elP.textContent = movie.description;
              elDiv.appendChild(elH3);
              elDiv.appendChild(elImg);
              // elDiv.appendChild(elP);
              elDivMovies.appendChild(elDiv);
            }
            break;
        }
      } else {
        if (movies[i].belongsToMyCollection == true) {
          const elDiv = document.createElement("div");
          elDiv.setAttribute("id", "movie" + i + 1);
          elDiv.classList.add("movie");
          const elH3 = document.createElement("h3");
          elH3.textContent = movies[i].name;
          const elImg = document.createElement("img");
          elImg.src = movies[i].asset;

          // const elP = document.createElement("p");
          // elP.textContent = movie.description;
          elDiv.appendChild(elH3);
          elDiv.appendChild(elImg);
          // elDiv.appendChild(elP);
          elDivMovies.appendChild(elDiv);
        }
      }
    }
  });
}

function addMovie(NrOfMovie) {
  const movie = newMovies[NrOfMovie - 1];
  movie.belongsToMyCollection = true;
  axios
    .put(`http://localhost:3001/api/movie/${NrOfMovie - 1}`, movie)
    .then((response) => {
      loadMovies();
    });
}
function removeMovie(NrOfMovie) {
  const movie = myMovies[NrOfMovie - 1];
  movie.belongsToMyCollection = false;
  axios
    .put(`http://localhost:3001/api/movie/${NrOfMovie - 1}`, movie)
    .then((response) => {
      loadMovies();
    });
}

function searchMovie() {
  const searchInput = document.getElementById("search-input").value;

  const query = searchInput;
}

let previousKey = 0;

function loadDataIntoPopup(isMyCollection, pressedKey) {
  let useThisArray = myMovies;
  if (isMyCollection) {
    useThisArray = myMovies;
  } else {
    useThisArray = newMovies;
  }
  const elPopup = document.getElementById("popup");
  const elH1 = document.createElement("h1");
  const elH2 = document.createElement("h2");
  const elP = document.createElement("p");
  const elImg = document.createElement("img");
  elPopup.innerHTML = "";
  elH1.textContent = useThisArray[pressedKey - 1].name;
  elH2.textContent = "Actors: " + myMovies[pressedKey - 1].actors;
  elP.textContent = useThisArray[pressedKey - 1].description;
  elImg.src = useThisArray[pressedKey - 1].asset;
  elPopup.appendChild(elH1);
  elPopup.appendChild(elH2);
  elPopup.appendChild(elP);
  elPopup.appendChild(elImg);
  elPopup.classList.toggle("hidden");
}

function addEventMyCollection(pressedKey) {
  if (
    (pressedKey >= 1 && pressedKey <= myMovies.length) ||
    pressedKey === "Escape"
  ) {
    if (pressedKey === "Escape") {
      const elPreviousMovie = document.getElementById("movie" + previousKey);
      elPreviousMovie.classList.remove("selected");
      previousKey = 0;
    } else {
      if (
        previousKey >= 1 &&
        previousKey <= myMovies.length &&
        previousKey !== pressedKey
      ) {
        const elPreviousMovie = document.getElementById("movie" + previousKey);
        elPreviousMovie.classList.remove("selected");
      }
      const elDivMovie = document.getElementById("movie" + pressedKey);
      if (elDivMovie.classList.contains("selected")) {
        elDivMovie.classList.remove("selected");
        previousKey = 0;
      } else {
        elDivMovie.classList.add("selected");
        previousKey = pressedKey;
      }

      loadDataIntoPopup(true, pressedKey);
    }
  }
}

function addEventNewMovies(pressedKey) {
  if (
    (pressedKey >= 1 && pressedKey <= newMovies.length) ||
    pressedKey === "Escape"
  ) {
    if (pressedKey === "Escape") {
      const elPreviousMovie = document.getElementById("movie" + previousKey);
      elPreviousMovie.classList.remove("selected");
      previousKey = 0;
    } else {
      if (
        previousKey >= 1 &&
        previousKey <= newMovies.length &&
        previousKey !== pressedKey
      ) {
        const elPreviousMovie = document.getElementById("movie" + previousKey);
        elPreviousMovie.classList.remove("selected");
      }
      const elDivMovie = document.getElementById("movie" + pressedKey);
      if (elDivMovie.classList.contains("selected")) {
        elDivMovie.classList.remove("selected");
        previousKey = 0;
      } else {
        elDivMovie.classList.add("selected");
        previousKey = pressedKey;
      }
    }
  }
}

document.addEventListener("keyup", (e) => {
  const pressedKey = e.key;
  // is the pressed key a number between 1 and 4?
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.has("belongsToMyCollection")) {
    switch (urlParams.get("belongsToMyCollection")) {
      case "true":
        addEventMyCollection(pressedKey);
        break;
      case "false":
        addEventNewMovies(pressedKey);
        break;
    }
  }
  if (pressedKey == "h") {
    addMovie(previousKey);
  }
  if (pressedKey == "l") {
    removeMovie(previousKey);
  }
});

function moviesRedirect(location) {
  window.location.href = `http://localhost:3001/?belongsToMyCollection=${location}`;
}

function addButtonListener() {
  const elMyMoviesBtn = document.getElementById("my-movies-btn");
  elMyMoviesBtn.addEventListener("click", () => {
    moviesRedirect(true);
  });
  const elNewMoviesBtn = document.getElementById("new-movies-btn");
  elNewMoviesBtn.addEventListener("click", () => {
    moviesRedirect(false);
  });
}

const elSearch = document.getElementById("search-btn");

elSearch.addEventListener("click", searchMovie);

loadMovies();
addButtonListener();
