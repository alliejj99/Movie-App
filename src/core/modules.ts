//======================== COMPONENT ========================//

interface ComponentPayload {
  tagName?: string;
  props?: {
    [key: string]: unknown;
  };
  state?: {
    [key: string]: unknown;
  };
}

export class Component {
  public el;
  public props;
  public state;

  constructor(payload: ComponentPayload = {}) {
    const {
      tagName = "div", // 최상위 요소의 태그 이름
      state = {},
      props = {},
    } = payload;

    this.el = document.createElement(tagName); // 컴포넌트의 최상위 요소
    this.props = props; // 컴포넌트가 사용될 때 부모 컴포넌트에서 받는 데이터
    this.state = state; // 컴포넌트 안에서 사용할 데이터
    this.render();
  }
  render() {
    // class 함수를 확장할때만 사용
    // ...
  }
}

//======================== ROUTER ========================//
interface Route {
  path: string;
  component: typeof Component;
}
type Routes = Route[];

// 페이지 렌더링!
function routeRender(routes: Routes) {
  if (!location.hash) {
    history.replaceState(null, "", "/#/"); // 기록을 남기지 않고 페이지 이동
  }
  const routerView = document.querySelector("router-view");
  const [hash, queryString = ""] = location.hash.split("?");

  // 1. 쿼리스트링을 객체로 변환해 히스토리의 상태에 저장!
  interface Query {
    [key: string]: string;
  }
  const query = queryString.split("&").reduce((acc, cur) => {
    const [key, value] = cur.split("=");
    acc[key] = value;
    return acc;
  }, {} as Query);
  history.replaceState(query, ""); // (상태, 제목)

  // 2. 현재 라우트 정보를 찿아서 렌더링!
  const currentRoute = routes.find((route) =>
    new RegExp(`${route.path}/?$`).test(hash)
  );
  if (routerView) {
    routerView.innerHTML = "";
    currentRoute && routerView.append(new currentRoute.component().el);
  }

  // 3. 화면 출력후 스크롤 위치 복구!
  window.scrollTo(0, 0);
}

export function createRouter(routes: Routes) {
  // 원하는(필요한) 곳에서 호출할 수 있도록 함수 데이터를 반환!
  return function () {
    // 주소가 변경되면 실행 popstate
    window.addEventListener("popstate", () => {
      routeRender(routes);
    });
    routeRender(routes);
  };
}

//======================== STORE ========================//
interface StoreObservers {
  [key: string]: SubscribeCallback[];
}

interface SubscribeCallback {
  (arg: unknown): void;
}

export class Store<S> {
  public state = {} as S; // 상태(데이터)
  private observers = {} as StoreObservers; // 데이터 감시

  constructor(state: S) {
    // 객체 데이터를 for문으로 반복할때는 for-in문을 사용
    for (const key in state) {
      // defineProperty: 객체 데이터의 어떠한 속성을 정의할때 사용하는 메소드
      // (속성, 속성의 이름, {get데이터, set데이터})
      Object.defineProperty(this.state, key, {
        get: () => state[key], // state['message']
        set: (val) => {
          state[key] = val;
          if (Array.isArray(this.observers[key])) {
            // 호출할 콜백이 있는 경우!
            this.observers[key].forEach((observer) => observer(val));
          }
        },
      });
    }
  }

  subscribe(key: string, callback: SubscribeCallback) {
    // 데이터를 감시할거고, 값이 변하면 함수를 실행
    Array.isArray(this.observers[key]) // 배열 데이터라면
      ? this.observers[key].push(callback) // 콜백 함수를 마지막으로 저장
      : (this.observers[key] = [callback]); // key이름이 변경되면 => set함수 실행
  }

  // 예시)
  // observers = {
  //   구독할 상태 이름: [실행콜백1, 실행콜백2]
  //   movies: [cb, cb, cb]
  // }
}
