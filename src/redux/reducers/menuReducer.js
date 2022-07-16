// import data from "../../content/theme1.json";

// "c" значит content
let cFont = localStorage.getItem("cFont");
let cFontSize = localStorage.getItem("cFontSize");
let cFontLineHeight = localStorage.getItem("cFontLineHeight");
let cFontLetterSpacing = localStorage.getItem("cFontLetterSpacing");
let colorThemeGet = localStorage.getItem("colorTheme");

let initialState = {
  // themes: {},
  colorTheme: colorThemeGet ? colorThemeGet : "white-theme",
  hideShowMenu: "",
  newTextSearch: "",
  isSettingWindow: false,
  fontSetting: {
    fontFamily: cFont ? cFont : "Montserrat",
    size: cFontSize ? cFontSize : 16,
    lineHeight: cFontLineHeight ? cFontLineHeight : 30,
    letterSpacing: cFontLetterSpacing ? cFontLetterSpacing : 0,
    fonts: [
      "Montserrat",
      "Arial Black",
      "Comic Sans MS",
      "Courier New",
      "Georgia",
      "Impact",
      "Times New Roman",
      "Trebuchet MS",
      "Verdana",
    ],
  },

  preloaderActive: false,
};

let menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case "HIDE_SHOW_MENU":
      if (state.hideShowMenu === "") state.hideShowMenu = "step--hide";
      else state.hideShowMenu = "";
      return state;

    case "SWITH_COLOR_THEME":
      if (state.colorTheme === "white-theme") state.colorTheme = "dark-theme";
      else state.colorTheme = "white-theme";
      localStorage.setItem("colorTheme", state.colorTheme);
      return state;

    case "UPDATE_TEXT_SEARCH":
      state.newTextSearch = action.newText;
      return state;

    case "RESIZE_FONT":
      state.fontSetting.size = action.size;
      localStorage.setItem("cFontSize", state.fontSetting.size);
      return state;

    case "LINE_HEIGHT_FONT":
      state.fontSetting.lineHeight = action.size;
      localStorage.setItem("cFontLineHeight", state.fontSetting.lineHeight);
      return state;

    case "LETTER_SPACING_FONT":
      state.fontSetting.letterSpacing = action.size;
      localStorage.setItem(
        "cFontLetterSpacing",
        state.fontSetting.letterSpacing
      );
      return state;

    case "TOGGLE_DISPLAY_SETTING":
      state.isSettingWindow = !state.isSettingWindow;
      return state;

    case "SETTING_RESET":
      state.fontSetting.size = 16;
      state.fontSetting.lineHeight = 30;
      state.fontSetting.letterSpacing = 0;

      localStorage.setItem("cFontSize", 16);
      localStorage.setItem("cFontLetterSpacing", 0);
      localStorage.setItem("cFontLineHeight", 30);

      state.fontSetting.fontFamily = "Montserrat";
      localStorage.setItem("cFont", "Montserrat");
      return state;

    case "FONT_SELECT":
      state.fontSetting.fontFamily = action.font;
      localStorage.setItem("cFont", state.fontSetting.fontFamily);
      return state;

    // case "FILL_CONTENT":
    //   // if (Object.keys(state.themes) === 0) {
    //   state.themes = action.content;
    //   console.log(state.themes);
    //   // }
    //   return state;

    default:
      return state;
  }
};

export default menuReducer;
