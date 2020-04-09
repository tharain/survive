import { Breadcrumb, Layout, Typography } from "antd";
import * as React from "react";
import Sidebar from "src/components/Sidebar";
import Routes from "src/Routes";
import { useSelector } from "react-redux";
import THeader from "src/components/THeader";

import styles from "./App.less";

const { Footer, Content } = Layout;

const { Text } = Typography;
interface Props {}

const App: React.FC<Props> = () => {
  const globalConfigs = useSelector((state) => state.globalConfigs);
  const { theme } = globalConfigs;
  return (
    <div className={styles[`layout_${theme}`]}>
      <Layout style={{ height: "100vh" }}>
        <THeader />
        <Layout>
          <Sidebar />
          <Layout>
            <Content
              style={{ overflow: "auto", height: "calc( 100% - 71px )" }}
            >
              <Routes />
            </Content>
            <Footer className={styles.bottomFooter}>
              <Text type="secondary">
                Still alive @ {new Date().getUTCFullYear()}
              </Text>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
