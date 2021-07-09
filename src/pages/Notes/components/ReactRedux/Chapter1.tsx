import { Typography, Tag } from "antd";
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
    <Title level={4}>1.1 What does React-Redux exports</Title>
    <Text strong={true}>Exports</Text>
    <Tag></Tag>
  </BasicCard>
);

export default Chapter1;
