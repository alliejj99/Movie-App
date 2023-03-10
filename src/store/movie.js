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
    const res = await fetch("/api/movie", {
      method: "POST",
      body: JSON.stringify({
        title: customStore.state.searchText,
        page,
      }),
    });

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
    const res = await fetch("/api/movie", {
      method: "POST", // 메소드가 get이 되면 body부분을 서버로 제대로 전달하지 못할 수 있으므로 'POST'를 명시한다.
      body: JSON.stringify({
        id,
      }),
    });
    customStore.state.movie = await res.json();
  } catch (error) {
    console.log("getMovieDetails ERROR:", error);
  }
};
