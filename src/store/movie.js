import { Store } from "../core/modules";

const store = new Store({
  searchText: "",
  page: 1,
  movies: [],
});

export default store;
export const searchMovies = async (page) => {
  // ombd사이트를 사용하여 데이터 불러오기
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=7035c60c&s=${store.state.searchText}&page=${page}`
  );
  const json = await res.json();
  console.log(json);
};
