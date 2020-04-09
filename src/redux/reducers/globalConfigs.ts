import { SET_THEME } from "src/redux/actions/globalConfigs";
export type Theme = "light" | "dark";

const defaultState = {
  theme: "dark",
};

const globalConfigs = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: payload,
      };
    default:
      return state;
  }
};

export default globalConfigs;
