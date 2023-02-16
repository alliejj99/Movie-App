import TheHeader from "./components/TheHeader";
// import TheFooter from "./components/TheFooter";
import TheFooter from "./components/TheFooter";
import { Component } from "./core/modules";

export default class App extends Component {
  render() {
    const theHeader = new TheHeader().el;
    const theFooter = new TheFooter().el;
    const routerView = document.createElement("router-view");
    this.el.append(theHeader, routerView, theFooter);
  }
}
