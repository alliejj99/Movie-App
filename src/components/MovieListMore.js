import { Component } from "../core/modules";
import movieStore, { searchMovies } from "../store/movie";

export default class MovieListMore extends Component {
  constructor() {
    super({
      tagName: "button",
    });
    movieStore.subscribe("pageMax", () => {
      // movieStore.state.page
      // movieStore.state.pageMax => 반복을 줄이기 위해 객체 구조분해를 사용

      const { page, pageMax } = movieStore.state;
      pageMax > page
        ? this.el.classList.remove("hide")
        : this.el.classList.add("hide");
    });
  }
  render() {
    this.el.classList.add("btn", "view-more", "hide");
    this.el.textContent = "View More...";

    this.el.addEventListener("click", async () => {
      this.el.classList.add("hide");

      // 더 보기 버튼을 클릭하면,
      // 다음페이지 보이기 위해 현재 페이지 넘버에 + 1을 한다.
      await searchMovies(movieStore.state.page + 1);
    });
  }
}
