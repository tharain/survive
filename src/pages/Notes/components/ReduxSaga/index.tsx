import { Button, Card, Col, Collapse, Divider, Row, Typography } from "antd";
import * as React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  docco,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import BasicCard from "src/components/BasicCard";
import Gap from "src/components/Gap";
import { Theme } from "src/redux/reducers/globalConfigs";

import Chapter1 from "./Chapter1";
import Chapter2 from "./Chapter2";
import Chapter3 from "./Chapter3";
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

const ReduxSaga: React.FC<Props> = ({ theme = "light" }: Props) => {
  const [jargons, setJargons] = useState<boolean>(false);
  return (
    <div className={styles.notes}>
      <BasicCard theme={theme}>
        <Title level={2}>Redux Saga</Title>
        <Text>
          Reference:{" "}
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html"
          >
            Redux-Saga Tutorial
          </a>
        </Text>
        <br />
        <br />
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
            <Card title="Saga">
              When you see the word <b>saga</b>, you actually just meant a{" "}
              <b>Generator Function</b> that SagaMiddleware takes in.
              <br />
              <br />
              It is a set of instructions that the middleware executes and yield
              ensures that asynchronous code like Promise is run synchronously.
              <Gap />
              <Card title="Generator Function">
                You code it like a function
                <br />
                <i>{`function* yourName(...args) {}`}</i>
                <br />
                Notice the "<b>*</b>"? It indicates it is a Generator function.
                <br />
                <br />
                You can and should use <b>yield</b> in generator function.
                <br />
                <br />
                Calling a Generator function does not return a value or
                undefined but a generator-iterator.
                <br />
                <br />
                You can return evaluated function iterations by calling{" "}
                <i>next()</i> method. ie. yourName().next()
              </Card>
              <Gap />
              <Card title="Yield">
                Yield is a <b>Generator</b>. If you pass some parameters into
                the Generator function, yield will use the arguments.
                <br />
                <br />
                However, whatever come after yield is not actually evaluated.
                <br />
                <br />
                Each call of next() will execute the script until it sees the
                first yield and pause the script.
                <br />
                <br />
                Calling next() again will resume from the script 1 line below
                the previous yield executed.
              </Card>
            </Card>
          </BasicCard>
        </>
      )}
      <Gap />
      <Chapter1 theme={theme} />
      <Gap />
      <Chapter2 theme={theme} />
      <Gap />
      <Chapter3 theme={theme} />
    </div>
  );
};

export default ReduxSaga;
