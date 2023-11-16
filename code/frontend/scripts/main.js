function loadMovies() {
  axios.get("http://localhost:3001/api/movie").then((response) => {
    const movies = response.data;
    const elDivMovies = document.getElementById("data");
    for (let i = 0; i < movies.length; i++) {
      const elDiv = document.createElement("div");
      elDiv.setAttribute("id", i + 1);
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
    console.log(movies);
  });
}

let previousKey = 0;

document.addEventListener("keyup", (e) => {
  const pressedKey = e.key;
  // is the pressed key a number between 1 and 4?
  if ((pressedKey >= 1 && pressedKey <= 4) || pressedKey === "Escape") {
    if (pressedKey === "Escape") {
      const elPreviousMovie = document.getElementById(previousKey);
      elPreviousMovie.classList.remove("selected");
      previousKey = 0;
    } else {
      if (previousKey >= 1 && previousKey <= 4 && previousKey !== pressedKey) {
        const elPreviousMovie = document.getElementById(previousKey);
        elPreviousMovie.classList.remove("selected");
      }
      const elDivMovie = document.getElementById(pressedKey);
      if (elDivMovie.classList.contains("selected")) {
        elDivMovie.classList.remove("selected");
        previousKey = 0;
      } else {
        elDivMovie.classList.add("selected");
        previousKey = pressedKey;
      }
    }
  }
});

loadMovies();
