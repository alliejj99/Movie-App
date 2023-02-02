import { Store } from "../core/modules";

const store = new Store({
  searchText: "",
  page: 1,
  movies: [],
});

export default store;
export const searchMovies = async (page) => {
  // 페이지 번호가 1페이지면 기존 데이터는 초기화화
  if (page === 1) {
    store.state.page = 1;
    store.state.movies = [];
  }

  // ombd사이트를 사용하여 데이터 불러오기
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=7035c60c&s=${store.state.searchText}&page=${page}`
  );

  // 값을 할당하여 게속 합치는 상태
  const { Search } = await res.json();
  store.state.movies = [...store.state.movies, ...Search];
};
