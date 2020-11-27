import THEME_ACTION_TYPES from "./theme.action.types";
import { DARK_THEME, LIGHT_THEME } from "../../theme";

const THEME_NAME_THEME_MAP = {
  light: LIGHT_THEME,
  dark: DARK_THEME
};

const persistedThemeName = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : "light";

const persistedTheme = THEME_NAME_THEME_MAP[persistedThemeName]
  ? THEME_NAME_THEME_MAP[persistedThemeName]
  : LIGHT_THEME;

const INITIAL_STATE = {
  theme: persistedTheme
};

const themeReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case THEME_ACTION_TYPES.CHANGE_THEME:
      localStorage.setItem("theme", action.payload);
      return {
        ...prevState,
        theme: THEME_NAME_THEME_MAP[action.payload]
      };
    default:
      return prevState;
  }
};

export default themeReducer;
