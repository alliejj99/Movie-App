import { Component } from "../core/modules";

export default class TheHeader extends Component {
  constructor() {
    super({
      tagName: "header",
      state: {
        menus: [
          {
            name: "Search",
            href: "#/",
          },
          {
            name: "Movie",
            href: "#/movie?id=tt4520988",
          },
          {
            name: "About",
            href: "#/about",
          },
        ],
      },
    });

    // popstate => 페이지가 바뀔때마다 실행
    window.addEventListener("popstate", () => {
      this.render();
    });
  }

  render() {
    this.el.innerHTML = /* html */ `
      <a href='#/' class="logo">
        <span>OMDbAPI</span>.COM
      </a>

      <nav>
        <ul>
          ${this.state.menus
            .map((menu) => {
              const href = menu.href.split("?")[0];
              const hash = location.hash.split("?")[0];

              const isActive = href === hash;

              return /* html */ `
              <li>
                <a 
                  href="${menu.href}"
                  class ="${isActive ? "active" : ""}"
                >
                  ${menu.name}
                </a>
              </li>
            `;
            })
            .join("")}
        </ul>
      </nav>

      <a href="#/about" class="user">
        <img src="../../favicon.png" alt="User">
      </a>
    `;
  }
}
