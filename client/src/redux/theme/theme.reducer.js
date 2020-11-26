import THEME_ACTION_TYPES from "./theme.action.types";
import { LIGHT_THEME } from "../../theme";

const INITIAL_STATE = {
  theme: LIGHT_THEME
};

const themeReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case THEME_ACTION_TYPES.CHANGE_THEME:
      return {
        ...prevState,
        theme: action.payload
      };
    default:
      return prevState;
  }
};

export default themeReducer;
