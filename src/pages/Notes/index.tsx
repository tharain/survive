import * as React from "react";
import BasicCard from "src/components/BasicCard";
import PageLayout from "src/components/PageLayout";

import NotesMaster from "./components/NotesMaster";
import styles from "./index.less";
import { useSelector } from "react-redux";

const { useState } = React;
interface Props {
  note?: string | null;
}

const Notes: React.FC<Props> = ({ note }) => {
  const globalConfigs = useSelector((state) => state.globalConfigs);
  const { theme } = globalConfigs;
  return (
    <PageLayout title="Notes">
      <NotesMaster theme={theme} note={note} />
    </PageLayout>
  );
};

export default Notes;
