import { Component } from "../core/modules";
import Headline from "../components/Headline";
import Search from "../components/Search";

export default class Home extends Component {
  render() {
    // 요소로 만들기
    const headeline = new Headline().el;
    const search = new Search().el;

    // Home 내부의 요소에 container 클래스 추가하기
    this.el.classList.add("container");

    // 요소로 만든 js파일 container 내부에 출력하기
    this.el.append(headeline, search);
  }
}
