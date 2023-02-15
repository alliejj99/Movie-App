import { Component } from "../core/modules";
import movieStore from "../store/movie";
import MovieItem from "./MovieItem";

export default class MovieList extends Component {
  constructor() {
    super();
    // movies가 계속 업데이트 될때마다 렌더링을 새로 한다.
    movieStore.subscribe("movies", () => {
      this.render();
    });
    movieStore.subscribe("loading", () => {
      this.render();
    });
    movieStore.subscribe("message", () => {
      this.render();
    });
  }

  render() {
    this.el.classList.add("movie-list");
    this.el.innerHTML = /* html */ `
      ${
        movieStore.state.message
          ? `<div class="message">${movieStore.state.message}</div>`
          : '<div class="movies"></div>'
      }
      <div class='loader hide'></div>
      
    `;

    const moviesEl = this.el.querySelector(".movies");
    moviesEl?.append(
      // moviesEl가 있을때만 실행
      ...movieStore.state.movies.map((movie) => new MovieItem({ movie }).el)
    );

    const loaderEl = this.el.querySelector(".loader");
    movieStore.state.loading
      ? loaderEl?.classList.remove("hide")
      : loaderEl?.classList.add("hide");
  }
}
