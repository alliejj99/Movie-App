import { Component } from "../core/modules";

export default class Home extends Component {
  render() {
    this.el.innerHTML = /* html */ `
      <h1>Hello</h1>
    `;
  }
}
