import Theme from "src/redux/reducers/globalConfigs";

export const SET_THEME = "setTheme";

export const setTheme = (payload: typeof Theme) => ({
  type: SET_THEME,
  payload,
});
