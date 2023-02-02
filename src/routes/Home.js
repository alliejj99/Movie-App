import { Component } from "../core/modules";
import Headline from "../components/Headline";

export default class Home extends Component {
  render() {
    const headeline = new Headline().el; // 요소로 만들기
    this.el.classList.add("container");
    this.el.append(headeline);
  }
}
