import * as React from "react";
import { Typography, Divider, Card, Row, Col } from "antd";
import BasicCard from "src/components/BasicCard";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  docco,
  atomOneDark,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Theme } from "src/redux/reducers/globalConfigs";
import styles from "./index.less";
import { Collapse } from "antd";

const { Panel } = Collapse;

interface Props {
  theme?: Theme;
}

const THEME = {
  light: docco,
  dark: atomOneDark,
};
const { Text, Paragraph, Title } = Typography;

const Chapter3 = ({ theme }) => (
  <BasicCard theme={theme}>
    <Title level={3}>3 Advance Concepts</Title>
    <Title level={4}>3.1 Pulling Future Actions</Title>
    <Text strong={true}>A Basic Logger</Text>
    <Paragraph type="secondary" className={styles.wrapText}>
      We can use wildcard <b>*</b> pattern to dispatch actions regardless of
      their types.
    </Paragraph>
    <SyntaxHighlighter
      language="javascript"
      style={THEME[theme]}
      showLineNumbers={true}
    >
      {`import { select, takeEvery } from 'redux-saga/effects';
      
function* watchAndLog() {
    yield takeEvery('*', function* logger(action) {
        const state = yield select();

        console.log('action', action);
        console.log('state after', state);
    });
}

// alternate code
function* watchAndLogV2() {
    while(true) {
        const action = yield take('*');
        const state = yield select();

        console.log('action', action);
        console.log('state after', state);
    }
}`}
    </SyntaxHighlighter>
    <Collapse defaultActiveKey={["1"]}>
      <Panel header="(Optional) Explanation of Effects used" key="1">
        <Row gutter={8}>
          <Col flex="1 1">
            <Card
              title="take(pattern)"
              style={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
            >
              {`Creates an Effect description that instructs the middleware to wait for a specified action on the Store.
The Generator is suspended until an action that matches the pattern is dispatched.

The result of yield take(pattern) is an action object being dispatched.

The benefit of take over takeEvery is that you can control the number of times it can be called.`}
            </Card>
          </Col>
          <Col flex="1 1">
            <Card
              title="select(selector, ...args)"
              style={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
            >
              {`Create an effect that instructs the middleware to invoke the provided selector on the current Store's state.

o selector?: function (state, ...args) that takes in the current state and optionally some argument and return a slice of current store state

If select is called without arguments, it returns getState() call`}
            </Card>
          </Col>
        </Row>
      </Panel>
    </Collapse>
    <Paragraph type="secondary" className={styles.wrapText}>
      A benefit of using <b>take(pattern)</b> is you are able to write logic
      like login / logout in a single Saga as shown:
    </Paragraph>
    <SyntaxHighlighter
      language="javascript"
      style={THEME[theme]}
      showLineNumbers={true}
    >
      {`import { take } from 'redux-saga/effects';
      
function* loginFlow() {
    while(true) {
        yield take('LOGIN');
        // ...perform login logic

        yield take('LOGOUT');
        // ...perform logout logic
    }
}`}
    </SyntaxHighlighter>
  </BasicCard>
);

export default Chapter3;
