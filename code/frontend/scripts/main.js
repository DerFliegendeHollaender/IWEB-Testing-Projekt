function loadMovies() {
  axios.get("http://localhost:3001/api/movie").then((response) => {
    const movies = response.data;
    const elDivMovies = document.getElementById("data");
    const elH2 = document.createElement("h2");
    elH2.textContent = "Movies";
    elDivMovies.appendChild(elH2);
    for (let i = 0; i < movies.length; i++) {
      const elDiv = document.createElement("div");
      elDiv.classList.add("movie");
      const elH3 = document.createElement("h3");
      elH3.textContent = movies[i].name;
      const elImg = document.createElement("img");
      elImg.src = "./../assets/" + (i + 1) + ".jpg";

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

loadMovies();
