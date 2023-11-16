const BASE_URL = {
  MOVIE: "/api/movie",
};

const createService = (baseUrl) => {
  return {
    getAll: () => getAll(baseUrl),
    create: (newObject) => create(baseUrl, newObject),
  };
};

const getAll = (baseUrl) => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (baseUrl, newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const movieService = createService(BASE_URL.MOVIE);

export { movieService };
