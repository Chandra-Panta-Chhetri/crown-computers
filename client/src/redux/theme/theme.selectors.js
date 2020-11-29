import { createSelector } from "reselect";
import { LIGHT_THEME } from "./themeStyles";
import { THEME_NAME_THEME_MAP } from "./theme.reducer";

const selectTheme = (state) => state.theme;

export const selectThemeName = createSelector(
  [selectTheme],
  (theme) => theme.themeName
);

export const selectThemeStyles = createSelector(
  [selectThemeName],
  (themeName) =>
    THEME_NAME_THEME_MAP[themeName]
      ? THEME_NAME_THEME_MAP[themeName]
      : LIGHT_THEME
);
