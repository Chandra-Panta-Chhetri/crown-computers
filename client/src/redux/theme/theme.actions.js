import THEME_ACTION_TYPES from "./theme.action.types";

export const changeTheme = (themeName) => ({
  type: THEME_ACTION_TYPES.CHANGE_THEME,
  payload: themeName
});
