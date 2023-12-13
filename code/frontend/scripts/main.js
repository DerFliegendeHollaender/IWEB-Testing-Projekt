const wholeMovieList = [];

function loadMovies() {
  axios.get("http://localhost:3001/api/movie").then((response) => {
    const movies = response.data;
    const elDivMovies = document.getElementById("data");
    for (let i = 0; i < movies.length; i++) {
      wholeMovieList.push(movies[i]);
      console.log(wholeMovieList);
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      console.log(urlParams);
      if (urlParams.has("belongsToMyCollection")) {
        switch (urlParams.get("belongsToMyCollection")) {
          case "true":
            if (movies[i].belongsToMyCollection == true) {
              const elDiv = document.createElement("div");
              elDiv.setAttribute("id", "movie" + (i + 1));
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
              const elDiv = document.createElement("div");
              elDiv.setAttribute("id", "movie" + (i + 1));
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
    console.log(movies);
  });
}

function addMovie() {}
function removeMovie(NrOfMovie) {
  const elName = document.querySelector(
    "#movie" + NrOfMovie + " h3"
  ).textContent;
  console.log(elName);
  const movie = wholeMovieList[NrOfMovie];
  movie.belongsToMyCollection = false;
  console.log(movie);
  axios.put("http://localhost:3001/api/movie", movie).then((response) => {
    console.log(response.data);
  });
}

function searchMovie() {
  const searchInput = document.getElementById("search-input").value;

  const query = searchInput;

  console.log(query);
}

let previousKey = 0;

document.addEventListener("keyup", (e) => {
  const pressedKey = e.key;
  // is the pressed key a number between 1 and 4?
  if ((pressedKey >= 1 && pressedKey <= 4) || pressedKey === "Escape") {
    if (pressedKey === "Escape") {
      const elPreviousMovie = document.getElementById("movie" + previousKey);
      elPreviousMovie.classList.remove("selected");
      previousKey = 0;
    } else {
      if (previousKey >= 1 && previousKey <= 4 && previousKey !== pressedKey) {
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
  if (pressedKey == "h") {
    addMovie(previousKey);
  }
  if (pressedKey == "l") {
    removeMovie(previousKey);
  }
});

const elSearch = document.getElementById("search-btn");

elSearch.addEventListener("click", searchMovie);

loadMovies();
