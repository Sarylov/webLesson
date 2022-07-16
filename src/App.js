import "./css/animate.min.css";
import "./css/font-awesome.min.css";
import "./css/style.css";
import Content from "./moduls/Content";
import Menu from "./moduls/Menu";
import { BrowserRouter } from "react-router-dom";

function App(props) {
  return (
    <div
      // выбор темы приложения
      className={
        "app " +
        props.state.menu.colorTheme +
        " " +
        props.state.menu.hideShowMenu
      }
    >
      <BrowserRouter>
        <div className="wraper">
          <Menu
            state={props.state.menu}
            themes={props.state.content.themes}
            dispatch={props.dispatch}
          />

          <Content
            fontSetting={props.state.menu.fontSetting}
            state={props.state.content}
            dispatch={props.dispatch}
          />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
