import { Store } from "../core/modules";

const customStore = new Store({
  searchText: "",
  page: 1,
  pageMax: 1,
  movies: [],
  movie: {},
  loading: false,
  message: "Search For The Movie Title",
});

export default customStore;
export const searchMovies = async (page) => {
  customStore.state.loading = true;
  customStore.state.page = page;
  // 페이지 번호가 1페이지면 기존 데이터는 초기화
  if (page === 1) {
    customStore.state.movies = [];
    customStore.state.message = "";
  }

  try {
    // ombd사이트를 사용하여 데이터 불러오기
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=7035c60c&s=${customStore.state.searchText}&page=${page}`
    );

    const { Search, totalResults, Response, Error } = await res.json();
    if (Response === "True") {
      customStore.state.movies = [...customStore.state.movies, ...Search];
      customStore.state.pageMax = Math.ceil(Number(totalResults) / 10);
    } else {
      customStore.state.message = Error;
    }
  } catch (error) {
    console.log("searchMovies Error: ", error);
  } finally {
    customStore.state.loading = false;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const res = await fetch(
      `https://omdbapi.com?apikey=7035c60c&i=${id}&plot=full`
    );
    customStore.state.movie = await res.json();
  } catch (error) {
    console.log("getMovieDetails ERROR:", error);
  }
};
