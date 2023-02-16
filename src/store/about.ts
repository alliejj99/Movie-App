import { Store } from "../core/modules";

interface State {
  photo: string;
  name: string;
  email: string;
  blog: string;
  github: string;
  repository: string;
}

export default new Store<State>({
  photo:
    "https://i.pinimg.com/564x/53/6c/a3/536ca3eb5f5e1c497acb6b120c870191.jpg",
  name: "JANG A REUM",
  email: "alliejj99@gmail.com",
  blog: "https://www.notion.so/Jang-A-Reum-a02309618af04592a862aa2467c95722",
  github: "https://github.com/alliejj99",
  repository: "https://github.com/alliejj99/Movie-App",
});
