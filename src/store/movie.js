import { Store } from "../core/modules";

const customStore = new Store({
  searchText: "",
  page: 1,
  pageMax: 1,
  movies: [],
  loading: false,
});

export default customStore;
export const searchMovies = async (page) => {
  customStore.state.loading = true;
  customStore.state.page = page;
  // 페이지 번호가 1페이지면 기존 데이터는 초기화
  if (page === 1) {
    customStore.state.movies = [];
  }

  // ombd사이트를 사용하여 데이터 불러오기
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=7035c60c&s=${customStore.state.searchText}&page=${page}`
  );

  // 값을 할당하여 게속 합치는 상태
  const { Search, totalResults } = await res.json();
  customStore.state.movies = [...customStore.state.movies, ...Search];
  customStore.state.pageMax = Math.ceil(Number(totalResults) / 10);
  customStore.state.loading = false;
};
