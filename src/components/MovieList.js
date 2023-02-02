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
  }

  render() {
    this.el.classList.add("movie-list");
    this.el.innerHTML = /* html */ `
      <div class="movies"></div>
      
    `;

    const moviesEl = this.el.querySelector(".movies");
    moviesEl.append(
      ...movieStore.state.movies.map((movie) => new MovieItem({ movie }).el)
    );
  }
}
