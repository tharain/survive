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

const Chapter2 = ({ theme }) => (
  <BasicCard theme={theme}>
    <Title level={3}>2 Basic Concept</Title>
    <Title level={4}>2.1 Putting it together</Title>
    <Text strong={true}>Integrating AJAX call</Text>
    <Paragraph type="secondary" className={styles.wrapText}>
      In this example, we will create a Saga that calls API.
    </Paragraph>
    <SyntaxHighlighter
      language="react"
      style={THEME[theme]}
      showLineNumbers={true}
    >
      {`import { call, put } from 'redux-saga/effects';

export function* fetchData(action) {
    try {
        const data = yield call(Api.fetchUser, action.payload.url);
        yield put({ type: 'FETCH_SUCCEEDED', data });
    } catch (error) {
        yield put({ type: 'FETCH_FAILED', error });
    }
}`}
    </SyntaxHighlighter>
    <Card>
      <Paragraph type="warning" className={styles.wrapText}>
        * I was confused between effects <i>call</i> and <i>put</i>, and there
        wasn't any article explaining online.
        <br />
        <br />
        Basically you use <b>call</b> when you want to trigger a function with
        arguments.
        <br />
        You use <b>put</b> when you want to call an action that triggers a
        reducer.
      </Paragraph>
    </Card>
    <Paragraph type="secondary" className={styles.wrapText}>
      Now you can create your rootSaga:
      <br />
      If you have multiple Sagas watching for different actions, you can create
      multiple watchers to behave like <Text mark>fork</Text> that used to spawn
      them.
    </Paragraph>
    <SyntaxHighlighter
      language="react"
      style={THEME[theme]}
      showLineNumbers={true}
    >
      {`import { takeLatest, takeEvery, all } from 'redux-saga/effects';
import Api from './.../api';
      
function* watchFetchData() {
    yield takeLatest('FETCH_REQUESTED', fetchData);
}

function* fetchData() {
    // AJAX request returns a Promise that resolve with response.
    const data = yield Api.fetch('/data');
}

function* fetchUsers(action) { ... }

function* createUser(action) { ... }

function* fetchAndCreateUsers() {
    yield takeEvery('FETCH_USERS', fetchUsers);
    yield takeEvery('CREATE_USER', createUser);
}`}
    </SyntaxHighlighter>
    <Collapse defaultActiveKey={["1"]}>
      <Panel header="(Optional) Explanation of Effects used" key="1">
        <Card
          title="takeLatest(pattern, saga, ...args)"
          style={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
        >
          Basically the same as <b>takeEvery</b> except that only one Saga can
          be run at any moment. If a previous Saga is still running, the
          previous Saga will automatically be cancelled.
        </Card>
      </Panel>
    </Collapse>
    <Title level={4}>2.2 Error Handling</Title>
    <Paragraph type="secondary" className={styles.wrapText}>
      Instead of try / catch block like above, you can return a normal value
      with some error flag on it:
    </Paragraph>
    <SyntaxHighlighter
      language="react"
      style={THEME[theme]}
      showLineNumbers={true}
    >
      {`import { call, put } from 'redux-saga/effects';

function fetchApi() {
    return Api.fetch('/api')
        .then(response => ({ response }))
        .catch(error => ({ error }));
}

function* fetchProducts() {
    const { response, error } = yield call(fetchProducts);
    if(response) {
        yield put({ type: 'API_CALL', data: response });
    } else {
        yield put({ type: 'API_FAILED', error });
    }
}`}
    </SyntaxHighlighter>
    <Text strong={true}>onError hook</Text>
    <Paragraph type="secondary" className={styles.wrapText}>
      {`Errors bubble up their parents until it is caught or reaches the root saga.

onError: (error: Error, { sagaStack: string }) is an option in createSagaMiddleware(options)`}
    </Paragraph>
  </BasicCard>
);

export default Chapter2;
