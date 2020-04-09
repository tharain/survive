import * as React from "react";
import { Collapse, Card, Row, Col } from "antd";

import styles from "./ExplainOptionals.less";

export interface OptionalInfo {
  title: string;
  children?: JSX.Element[] | JSX.Element | string;
}

interface Props {
  optionals: OptionalInfo[];
}

const { Panel } = Collapse;

const renderOptionals = (optionals: OptionalInfo[][]) => {
  return optionals.map((optionals2: OptionalInfo[]) => {
    if (optionals2.length === 2) {
      const [optional1, optional2] = optionals2;
      const { title, children } = optional1;
      const { title: title2, children: children2 } = optional2;
      return (
        <Row gutter={8} key={title}>
          <Col flex="1 1">
            <Card title={title} className={styles.wrapText}>
              {children}
            </Card>
          </Col>
          <Col flex="1 1">
            <Card title={title2} className={styles.wrapText}>
              {children2}
            </Card>
          </Col>
        </Row>
      );
    }
    if (optionals2.length === 1) {
      const [optional] = optionals2;
      const { title, children } = optional;
      return (
        <Card title={title} className={styles.wrapText} key={title}>
          {children}
        </Card>
      );
    }
    return null;
  });
};

const recalculateOptions = (optionals: OptionalInfo[]) => {
  return optionals.reduce(
    (prev: OptionalInfo[][], optional: OptionalInfo, index: number) => {
      if (index % 2) {
        const prevLastIndex = prev.length - 1;
        return prev.map((p, i) => {
          if (i === prevLastIndex) return [...p, optional];
          else return p;
        });
      }
      return [...prev, [optional]];
    },
    []
  );
};

const ExplainOptionals: React.FC<Props> = ({ optionals }: Props) => {
  console.log(optionals);
  const parsedOptionals = recalculateOptions(optionals);
  return (
    <Collapse defaultActiveKey={["1"]}>
      <Panel header="(Optional) Explanation of Effects used" key="1">
        {renderOptionals(parsedOptionals)}
      </Panel>
    </Collapse>
  );
};

export default ExplainOptionals;
