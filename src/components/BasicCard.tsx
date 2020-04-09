import * as React from "react";
import { Theme } from "src/redux/reducers/globalConfigs";
import styles from "./BasicCard.less";

interface Props {
  theme?: Theme;
  children?: JSX.Element[] | JSX.Element | string;
}

const BasicCard: React.FC<Props> = ({ theme = "light", children }) => (
  <div className={styles[`card_${theme}`]}>{children}</div>
);

export default BasicCard;
