import React, { useState } from "react";
import { ThemeToggleContainer } from "./theme-toggle.styles";

import { connect } from "react-redux";
import { changeTheme } from "../../redux/theme/theme.actions";
import { selectThemeName } from "../../redux/theme/theme.selectors";

const ThemeToggle = ({ changeTheme, themeName }) => {
  const [isDarkMode, setIsDarkMode] = useState(themeName === "dark");
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    changeTheme(!isDarkMode ? "dark" : "light");
  };

  return (
    <ThemeToggleContainer darkMode={isDarkMode} onClick={toggleDarkMode} />
  );
};

const mapStateToProps = (state) => ({
  themeName: selectThemeName(state)
});

const mapDispatchToProps = (dispatch) => ({
  changeTheme: (themeName) => dispatch(changeTheme(themeName))
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeToggle);
