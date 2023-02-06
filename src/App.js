import TheHeader from "./components/TheHeader";
import { Component } from "./core/modules";

export default class App extends Component {
  render() {
    const routerView = document.createElement("router-view");
    const theHeader = new TheHeader().el;
    this.el.append(theHeader, routerView);
  }
}
