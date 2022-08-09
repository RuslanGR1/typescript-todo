import React, { FC } from "react";
import { Refresh } from "shared/icons/Refresh";

import styles from "./styles.module.css";

interface Props {
  loading?: boolean;
}

const Spinner: FC<Props> = ({ loading = false }) => {
  return loading ? (
    <div className={styles.loader}>
      <Refresh />
    </div>
  ) : (
    <Refresh />
  );
};

export default Spinner;
