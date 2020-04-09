import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Notes from "src/pages/Notes";
import { useSelector } from "react-redux";

const THEME = {
  light: "src/clone/antd.min.css",
  dark: "src/clone/antd.dark.min.css",
};

const Routes = () => {
  const globalConfigs = useSelector((state) => state.globalConfigs);
  const { theme } = globalConfigs;
  const urlParams = new URLSearchParams(window.location.search);
  const note = urlParams.get("note");
  return (
    <div>
      <link rel="stylesheet" type="text/css" href={THEME[theme]} />
      <Notes note={note} />
    </div>
  );
};

export default Routes;
