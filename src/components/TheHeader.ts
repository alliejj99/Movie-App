import { Component } from "../core/modules";

interface State {
  [key: string]: unknown;
  menus: {
    name: string;
    href: string;
  }[];
}

export default class TheHeader extends Component {
  public state!: State; // 초기화 값이 없어도 할당되어 있는것 처럼 사용하겠다는 의미

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

    // popstate => 페이지가 바뀔때마다 실행(hash가 바뀔때 마다)
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
        <img src="https://i.pinimg.com/564x/53/6c/a3/536ca3eb5f5e1c497acb6b120c870191.jpg" alt="User">
      </a>
    `;
  }
}
