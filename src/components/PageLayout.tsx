import * as React from "react";
import { Typography } from "antd";
import styles from "./PageLayout.less";
const { Title } = Typography;

interface Props {
  title?: string;
  children?: JSX.Element[] | JSX.Element | string;
}

const PageLayout: React.FC<Props> = ({ title, children }) => (
  <div className={styles.main}>
    <Title>{title}</Title>
    {children}
  </div>
);

export default PageLayout;
