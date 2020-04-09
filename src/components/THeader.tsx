import { Layout, Switch } from "antd";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "src/assets/logo";
import { setTheme } from "src/redux/actions/globalConfigs";

import styles from "./THeader.less";

const { Header } = Layout;

const THeader = () => {
  const dispatch = useDispatch();
  const globalConfigs = useSelector((state) => state.globalConfigs);
  const { theme } = globalConfigs;
  return (
    <Header>
      <img src={Logo} alt="Logo" height="42" width="42" />
      <span className={styles[`title_${theme}`]}>Survive!</span>
      <Switch
        checked={theme === "dark"}
        onClick={(checked: boolean) => {
          if (checked) {
            dispatch(setTheme("dark"));
          } else {
            dispatch(setTheme("light"));
          }
        }}
        checkedChildren="D"
        unCheckedChildren="L"
      />
    </Header>
  );
};

export default THeader;
