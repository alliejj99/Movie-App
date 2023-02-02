//======================== COMPONENT ========================//
export class Component {
  constructor(payload = {}) {
    const { tagName = "div", state = {}, props = {} } = payload;
    this.el = document.createElement(tagName);
    this.state = state;
    this.props = props;
    this.render();
  }
  render() {
    // class 함수를 확장할때만 사용
    // ...
  }
}

//======================== ROUTER ========================//
function routeRender(routes) {
  if (!location.hash) {
    history.replaceState(null, "", "/#/"); // 기록을 남기지 않고 페이지 이동
  }

  const routerView = document.querySelector("router-view");
  const [hash, queryString = ""] = location.hash.split("?");
  // a=123&b=456
  // ['a=123', 'b=456']
  // { a: '123', b: '456'}
  const query = queryString.split("&").reduce((acc, cur) => {
    const [key, value] = cur.split("=");
    acc[key] = value;
    return acc;
  }, {});
  history.replaceState(query, ""); // 주소 생략

  const currentRoute = routes.find((route) =>
    new RegExp(`${route.path}/?$`).test(hash)
  );

  routerView.innerHTML = "";
  routerView.append(new currentRoute.component().el);

  window.scrollTo(0, 0);
}

export function createRouter(routes) {
  return function () {
    // 주소가 변경되면 실행 popstate
    window.addEventListener("popstate", () => {
      routeRender(routes);
    });
    routeRender(routes);
  };
}

//======================== STORE ========================//
export class Store {
  constructor(state) {
    this.state = {}; // 받아온 데이터를 빈 객체로 초기화
    this.observers = {}; // 데이터 감시
    // 객체 데이터를 for문으로 반복할때는 for-in문을 사용
    for (const key in state) {
      // defineProperty: 객체 데이터의 어떠한 속성을 정의할때 사용하는 메소드
      // (속성, 속성의 이름, {get데이터, set데이터})
      Object.defineProperty(this.state, key, {
        get: () => state[key], // statep['message']
        set: (val) => {
          state[key] = val;
          this.observers[key].forEach((observer) => observer(val));
        },
      });
    }
  }

  subscribe(key, callback) {
    // 데이터를 감시할거고, 값이 변하면 함수를 실행
    // { message: [cb1,cb2,cb3,...] }
    Array.isArray(this.observers[key]) // 배열 데이터라면
      ? this.observers[key].push(callback) // 콜백 함수를 마지막으로 저장
      : (this.observers[key] = [callback]); // key이름이 변경되면 => set함수 실행
  }
}
