import { Component } from "../core/modules";

export default class NotFound extends Component {
  render() {
    this.el.classList.add("container", "not-found");
    this.el.innerHTML = /* html */ `
      <h1>Sorry,<br>Not Found</h1>
    `;
  }
}
