import { Layout, Menu, Tooltip } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CloudOutlined,
  CodeOutlined,
  KeyOutlined,
  LaptopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReadOutlined,
  TrophyOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";

import styles from "./index.less";

const { Sider } = Layout;
const { useState } = React;
const { SubMenu } = Menu;

const Sidebar = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const note = urlParams.get("note");
  const selectedKey = [`/notes/${note}`];
  const globalConfigs = useSelector((state) => state.globalConfigs);
  const { theme } = globalConfigs;
  const [isCollapse, setIsCollapse] = useState<boolean>(false);
  const openKey = ["/notes"];
  return (
    <span className={styles[`global_sidebar_${theme}`]}>
      <Sider
        theme={theme}
        className={styles[`sider_${theme}`]}
        collapsed={isCollapse}
      >
        <Menu
          mode="inline"
          defaultOpenKeys={openKey}
          defaultSelectedKeys={selectedKey}
        >
          <SubMenu
            key="/notes"
            title={
              <>
                <CoffeeOutlined />
                <span>Notes</span>
              </>
            }
          >
            <Menu.Item key="/notes/reduxsaga">
              <Link to="?note=reduxsaga">
                <span>Redux-Saga</span>
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
        {isCollapse ? (
          <Tooltip title="Expand" placement="right">
            <div
              className={styles[`expandSidebar_${theme}`]}
              onClick={() => setIsCollapse(!isCollapse)}
              role="button"
              tabIndex={0}
            >
              <MenuUnfoldOutlined />
            </div>
          </Tooltip>
        ) : (
          <div
            className={styles[`hideSidebar_${theme}`]}
            onClick={() => setIsCollapse(!isCollapse)}
            role="button"
            tabIndex={0}
          >
            <MenuFoldOutlined />
            <span>Collapse</span>
          </div>
        )}
      </Sider>
    </span>
  );
};

export default Sidebar;
