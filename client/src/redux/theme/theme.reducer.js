import THEME_ACTION_TYPES from "./theme.action.types";
import { DARK_THEME, LIGHT_THEME } from "./themeStyles";

export const THEME_NAME_THEME_MAP = {
  light: LIGHT_THEME,
  dark: DARK_THEME
};

const persistedThemeName = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : "light";

const INITIAL_STATE = {
  themeName: persistedThemeName
};

const themeReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case THEME_ACTION_TYPES.CHANGE_THEME:
      localStorage.setItem("theme", action.payload);
      return {
        ...prevState,
        themeName: action.payload
      };
    default:
      return prevState;
  }
};

export default themeReducer;
