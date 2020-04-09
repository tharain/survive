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

const Chapter1 = ({ theme }) => (
  <BasicCard theme={theme}>
    <Title level={3}>1 Introduction</Title>
    <Title level={4}>1.1 How to run Saga</Title>
    <Text strong={true}>Redux Saga</Text>
    <Paragraph type="secondary" className={styles.wrapText}>
      {`The first step to understand Redux Saga is to know how to integrate it into your code.
      
      In main.js:`}
    </Paragraph>
    <SyntaxHighlighter
      language="react"
      style={THEME[theme]}
      showLineNumbers={true}
    >
      {`import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

// 1. Create a Saga Middleware with a list of Sagas to run.
const sagaMiddleware = createSagaMiddleware();
// 2. Connect the Saga middlware to the Redux store.
const store = createStore(reducer, applyMiddleware(sagaMiddleware));`}
    </SyntaxHighlighter>
    <Paragraph type="secondary" className={styles.wrapText}>
      To run a reducer, you can create a function and runs it like below:
    </Paragraph>
    <SyntaxHighlighter
      language="react"
      style={THEME[theme]}
      showLineNumbers={true}
      startingLineNumber={8}
    >
      {`function* helloWorld() {
    console.log('Hello World!');
}

sagaMiddleware.run(helloWorld);
`}
    </SyntaxHighlighter>
    <Title level={4}>1.2 Making Asynchronous Call</Title>
    <Paragraph type="secondary" className={styles.wrapText}>
      Let us first look at the reducers call we have at default in{" "}
      <b>reducers.js</b>
    </Paragraph>
    <SyntaxHighlighter
      language="react"
      style={THEME[theme]}
      showLineNumbers={true}
    >
      {`export default function counter(state=0, action) {
    switch(action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'INCREMENT_IF_ODD':
            return (state & 2 !== 0) ? state + 1 : state;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}`}
    </SyntaxHighlighter>

    <Paragraph type="secondary" className={styles.wrapText}>
      To demostrate asynchronous call, you can create a new module{" "}
      <b>sagas.js</b>.
    </Paragraph>
    <SyntaxHighlighter
      language="react"
      style={THEME[theme]}
      showLineNumbers={true}
    >
      {`import { put, takeEvery } from 'redux-saga/effects';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* helloWorld() {
    console.log('Hello World!');
}

export function* incrementAsync() {
    yield delay(1000);
    yield put({ type: 'INCREMENT' });
}

export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

export default function* rootSaga() {
    yield all([
        helloWorld(),
    watchIncrementAsync(),
])`}
    </SyntaxHighlighter>
    <Text strong={true}>Explaination</Text>
    <Paragraph type="secondary" className={styles.wrapText}>
      Sagas refers to <b>Generator functions</b> that yield objects to the
      redux-saga middleware. When a Promise is yielded to the middleware, the
      middleware will suspends the Saga untils the Promise completes.
    </Paragraph>
    <Paragraph type="secondary" className={styles.wrapText}>
      <b>Effect</b> (ie. put) is a plain JavaScript object that house
      instructions for middleware. Saga will pause whenever an Effect is
      yielded.
    </Paragraph>
    <Collapse defaultActiveKey={["1"]}>
      <Panel header="(Optional) Explanation of Effects used" key="1">
        <Row gutter={8}>
          <Col flex="1 1">
            <Card
              title="put(action)"
              style={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
            >
              {`Schdules an action to the store's saga task queue.
        
By default: The code next line will be executed after yield put(action).
Unless, if you have other Redux middleware with asynchronous flow that delay the propagation of the action.

Downstream errors(ie. from the reducer) will be bubbled up.`}
            </Card>
          </Col>
          <Col flex="1 1">
            <Card
              title="takeEvery(pattern, saga, ...args)"
              style={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
            >
              {`Spawns a saga on each action dispatched to the Store that matches pattern.

o pattern: String | Array | Function - for more information see docs for take(pattern)

o saga: a Generator function

o args: Array<any> - arguments to be passed to the started task. takeEvery will add the incoming action to the argument list (i.e. the action will be the last argument provided to saga)`}
            </Card>
          </Col>
        </Row>
        <Card
          title="all([...effects])"
          style={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
        >
          Creates an Effect description that instructs the middleware to run
          multiple Effects in parallel and wait for all of them to complete.
          It's quite the corresponding API to standard Promise.all
        </Card>
      </Panel>
    </Collapse>
    <Paragraph type="secondary" className={styles.wrapText}>
      Now to pass an array of asynchronous Sagas, you go back to main.js and add
      this line of code:
    </Paragraph>
    <SyntaxHighlighter
      language="react"
      style={THEME[theme]}
      showLineNumbers={true}
      startingLineNumber={8}
    >
      {`// function* helloWorld() {
//   console.log('Hello World!');
// }

// sagaMiddleware.run(helloWorld);
import rootSaga from './sagas';

sagaMiddleware.run(rootSaga);

// you can now call your code as
const action = type => store.dispatch({ type });

// somewhere in onClick
...
<Element
    onClick={() => action('INCREMENT_ASYNC')}
/>
// component dispatch a plain object action that triggers
// saga's action.
`}
    </SyntaxHighlighter>
    <Title level={4}>1.3 Making our code testable</Title>
    <Paragraph type="secondary" className={styles.wrapText}>
      Create file <b>sagas.spec.js</b>
    </Paragraph>
    <SyntaxHighlighter
      language="react"
      style={THEME[theme]}
      showLineNumbers={true}
    >
      {`import test from 'tape';
import { put, call } from 'redux-saga/effects';
import { incrementAsync, delay } from './sagas';

test('incrementAsync Saga test', (assert) => {
  const gen = incrementAsync();

  assert.deepEqual(
    gen.next().value,
    call(delay, 1000),
    'incrementAsync Saga must call delay(1000)'
  );

  assert.deepEqual(
    gen.next().value,
    put({ type: 'INCREMENT' }),
    'incrementAsync Saga must dispatch an INCREMENT action'
  );

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
    'incrementAsync Saga must be done'
  );

  assert.end();
})
`}
    </SyntaxHighlighter>
    <Collapse defaultActiveKey={["1"]}>
      <Panel header="(Optional) Explanation of Effects used" key="1">
        <Card
          title="call(fn, ...args)"
          style={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
        >
          {`Creates an Effect description that instructs the middleware to call the function fn with args as arguments:

o fn: a Generator function / normal function which returns a Promise or any value
o args: any[]`}
        </Card>
      </Panel>
    </Collapse>
  </BasicCard>
);

export default Chapter1;
