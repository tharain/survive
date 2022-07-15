import { Button, Card, Col, Collapse, Divider, Row, Typography } from "antd";
import * as React from "react";
import {
  atomOneDark,
  docco,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import BasicCard from "src/components/BasicCard";
import Gap from "src/components/Gap";
import { Theme } from "src/redux/reducers/globalConfigs";

import Chapter1 from "./Chapter1";
import styles from "./index.less";

const { useState } = React;

const { Panel } = Collapse;

interface Props {
  theme?: Theme;
}

const THEME = {
  light: docco,
  dark: atomOneDark,
};

const { Text, Paragraph, Title } = Typography;

const Driving: React.FC<Props> = ({ theme = "light" }: Props) => {
  const [jargons, setJargons] = useState<boolean>(false);
  return (
    <div className={styles.notes}>
      <BasicCard theme={theme}>
        <Title level={2}>Driving</Title>
        <Button onClick={() => setJargons(!jargons)}>
          {jargons
            ? "Hide jargons explanation"
            : "Explain difficult jargons please"}
        </Button>
      </BasicCard>
      {jargons && (
        <>
          <Gap />
          <BasicCard theme={theme}>
            <Title level={3}>Jargons</Title>
            <Card title="None">
              -
            </Card>
          </BasicCard>
        </>
      )}
      <Gap />
      <Chapter1 theme={theme} />
    </div>
  );
};

export default Driving;
