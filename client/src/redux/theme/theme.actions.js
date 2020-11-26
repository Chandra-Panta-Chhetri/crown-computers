import THEME_ACTION_TYPES from "./theme.action.types";

export const changeTheme = (theme) => ({
  type: THEME_ACTION_TYPES.CHANGE_THEME,
  payload: theme
});
