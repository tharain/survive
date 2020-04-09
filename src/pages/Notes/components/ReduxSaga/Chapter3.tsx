import * as React from "react";
import { Typography, Card } from "antd";
import BasicCard from "src/components/BasicCard";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  docco,
  atomOneDark,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Theme } from "src/redux/reducers/globalConfigs";
import styles from "./index.less";
import ExplainOptionals from "src/pages/Notes/components/ExplainOptionals";
import { Chpt3Optionals } from "./Glossary";

interface Props {
  theme?: Theme;
}

const THEME = {
  light: docco,
  dark: atomOneDark,
};
const { Text, Paragraph, Title } = Typography;

const Chapter3: React.FC<Props> = ({ theme = "light" }: Props) => (
  <BasicCard theme={theme}>
    <Title level={3}>3 Advance Concepts</Title>
    <Title level={4}>3.1 Pulling Future Actions</Title>
    <Text strong>A Basic Logger</Text>
    <Paragraph type="secondary" className={styles.wrapText}>
      We can use wildcard <b>*</b> pattern to dispatch actions regardless of
      their types.
    </Paragraph>
    <SyntaxHighlighter
      language="javascript"
      style={THEME[theme]}
      showLineNumbers
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
    <ExplainOptionals optionals={Chpt3Optionals} />
    <Paragraph type="secondary" className={styles.wrapText}>
      A benefit of using <b>take(pattern)</b> is you are able to write logic
      like login / logout in a single Saga like the code below:
      <br />
      <br />
      You can think this as an action sequence. Login will be followed by
      Logout. And Logout will be followed by Login.
    </Paragraph>
    <SyntaxHighlighter
      language="javascript"
      style={THEME[theme]}
      showLineNumbers
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
    <Title level={4}>3.2 Non-Blocking Call</Title>
    <Text strong>Fork</Text>
    <Paragraph type="secondary" className={styles.wrapText}>
      If you want to call an asynchronous API then executes an action, it will
      result in your code stop at calling API at first click, then execute the
      action at the second click.
      <br />
      <br />
      Let us look at the following problematic example:
    </Paragraph>
    <SyntaxHighlighter
      language="javascript"
      style={THEME[theme]}
      showLineNumbers
    >
      {`import { take, call put } from 'redux-saga/effects';
import Api from ...

function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password);
    yield put({ type: 'LOGIN_SUCCESS', token });
    return token;
  } catch (error) {
    yield put({ type: 'LOGIN_ERROR', error });
  }
}
      
function* loginFlow() {
    while(true) {
        const { user, password } = yield take('LOGIN_REQUEST');
        const token = yield call(authorize, user, password);
        // script will stop here upon login and not execute storing token
        if(token) {
          // clicking logout will execute storing token and not logout
          yield call(Api.storeItem, { token });
          yield take('LOGOUT');
          yield call(Api.clearItem, 'token');
        }
    }
}`}
    </SyntaxHighlighter>
    <Paragraph type="secondary" className={styles.wrapText}>
      You can use Effect <b>fork</b> to yield non-blocking calls, but we
      can&apos;t store token without first waiting for API to return a token.
      <br />
      <br />
      Hence you should move token storage to authorize saga instead.
    </Paragraph>
    <SyntaxHighlighter
      language="javascript"
      style={THEME[theme]}
      showLineNumbers
    >
      {`import { take, call put } from 'redux-saga/effects';
import Api from ...

function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password);
    yield put({ type: 'LOGIN_SUCCESS', token });
    yield call(Api.storeItem, { token });
    //return token;
  } catch (error) {
    yield put({ type: 'LOGIN_ERROR', error });
  }
}
      
function* loginFlow() {
    while(true) {
        const { user, password } = yield take('LOGIN_REQUEST');
        const token = yield call(authorize, user, password);
        yield fork(authorize, user, password);
        // !Error: what if user logout in the middle of API call, otherwise 2 concurrent tasks will evolve in parallel.
        yield take(['LOGOUT', 'LOGIN_ERROR']);
        yield call(Api.clearItem, 'token')
        /*
        if(token) {
          yield call(Api.storeItem, { token });
          yield take('LOGOUT');
          yield call(Api.clearItem, 'token');
        }
        */
    }
}`}
    </SyntaxHighlighter>
    <Paragraph type="secondary" className={styles.wrapText}>
      Take note of concurrent conflicting generator code with Effect{" "}
      <b>cancel</b>.
      <br />
      <br />
      <b>yield fork</b> returns a Task Object. You can cancel fork task with{" "}
      <b>cancel</b>
    </Paragraph>
    <SyntaxHighlighter
      language="javascript"
      style={THEME[theme]}
      showLineNumbers
      startingLineNumber={15}
    >
      {`function* loginFlow() {
  while(true) {
    const { user, password } = yield take('LOGIN_REQUEST');
    // fork return a Task object
    const task = yield fork(authorize, user, password);
    const action = yield take(['LOGOUT', 'LOGIN_ERROR']);
    if(action.type === 'LOGOUT') {
      yield cancel(task);
    }
    yield call(Api.clearItem, 'token');
  }
}`}
    </SyntaxHighlighter>
    <Paragraph type="secondary" className={styles.wrapText}>
      Using <b>cancel</b>, you can update the authorize saga to clean up.
    </Paragraph>
    <SyntaxHighlighter
      language="javascript"
      style={THEME[theme]}
      showLineNumbers
      startingLineNumber={4}
    >
      {`function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password);
    yield put({ type: 'LOGIN_SUCCESS', token });
    yield call(Api.storeItem, { token });
    return token;
  } catch (error) {
    yield put({ type: 'LOGIN_ERROR', error });
  } finally {
    if(yield cancelled()) {
      // ... cancellation handling code here
    }
  }
}`}
    </SyntaxHighlighter>
    <Card>
      <Paragraph type="warning" className={styles.wrapText}>
        * I was confused between effects <i>all</i> and <i>fork</i>, and there
        wasn&apos;t any article explaining online.
        <br />
        <br />
        Basically you use <b>all</b> when you want to execute 2 sagas at the
        same time.
        <br />
        <br />
        You use <b>fork</b> when you want to yield a blocking code in background
        and execute until the next yield included. Also you can use{" "}
        <b>cancel</b> to clean up the blocking code.
      </Paragraph>
    </Card>
  </BasicCard>
);

export default Chapter3;
