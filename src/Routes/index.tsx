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
  return (
    <div>
      <link rel="stylesheet" type="text/css" href={THEME[theme]} />
      <Switch>
        <Route
          exact
          path="/notes"
          component={(props) => {
            const urlParams = new URLSearchParams(props.location.search);
            const note = urlParams.get("note");
            return <Notes note={note} />;
          }}
        />
        <Route path="/" />
      </Switch>
    </div>
  );
};

export default Routes;
