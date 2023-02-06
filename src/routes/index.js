// 페이지 구분 기능 구성하기
import { createRouter } from "../core/modules";
import Home from "./Home";
import Movie from "./Movie";

export default createRouter([
  { path: "#/", component: Home },
  { path: "#/movie", component: Movie },
]);
