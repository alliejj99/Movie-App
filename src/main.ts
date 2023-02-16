import router from "./routes";
import App from "./App";

const root = document.querySelector("#root"); // 하위 파일 내용 넣을 태그 선택하기
root?.append(new App().el); // 하위 파일 불러오기

router(); // 페이지를 분리할 수 있는 라우터 실행 코드
