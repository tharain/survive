import * as React from "react";
import { Theme } from "src/redux/reducers/globalConfigs";
import styles from "./NotesMaster.less";

import ReduxSaga from "./ReduxSaga";
import ReactRedux from './ReactRedux';

interface Props {
  note?: string | null;
  theme?: Theme;
}

const NotesMaster: React.FC<Props> = ({ note, theme = "light" }) => {
  switch (note) {
    case "reduxsaga":
      return <ReduxSaga theme={theme} />;
    case 'react-redux':
      return <ReactRedux theme={theme} />
  }
  return null;
};

export default NotesMaster;
