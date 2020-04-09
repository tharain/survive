import { Typography } from "antd";
import * as React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  docco,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import BasicCard from "src/components/BasicCard";
import ExplainOptionals from "src/pages/Notes/components/ExplainOptionals";
import { Theme } from "src/redux/reducers/globalConfigs";

import { Chpt1Optionals, Chpt1Optionals2 } from "./Glossary";
import styles from "./index.less";

interface Props {
  theme?: Theme;
}
const THEME = {
  light: docco,
  dark: atomOneDark,
};
const { Text, Paragraph, Title } = Typography;

const Chapter1: React.FC<Props> = ({ theme = "light" }: Props) => (
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
      As a responsible Software Engineer, if you code something you know you
      need to debug your code eventually. There is a problem with the above code
      as it does not connect to redux dev-tools, at least. You could fix it by:
    </Paragraph>
    <SyntaxHighlighter
      language="react"
      style={THEME[theme]}
      showLineNumbers={true}
    >
      {`import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
// install redux-devtools-extension and you can now debug your code with ease.
const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));`}
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
    <ExplainOptionals optionals={Chpt1Optionals} />
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
    <ExplainOptionals optionals={Chpt1Optionals2} />
  </BasicCard>
);

export default Chapter1;
