// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/
//
// This file incorporates work covered by the following copyright and
// permission notice:
//
//   Copyright 2018-2021 Cruise LLC
//
//   This source code is licensed under the Apache License, Version 2.0,
//   found at http://www.apache.org/licenses/LICENSE-2.0
//   You may not use this file except in compliance with the License.

import cx from "classnames";
import { ReactNode, useCallback } from "react";

import { useWindowGeometry } from "@foxglove-studio/app/context/WindowGeometryContext";

import styles from "./Toolbar.module.scss";

type Props = {
  children: ReactNode;
  className?: string;
  onDoubleClick?: () => void;
};

function Toolbar(props: Props): React.ReactElement {
  const { className = "", onDoubleClick } = props;

  const { insetToolbar } = useWindowGeometry();

  const clickHandler = useCallback(
    (event: React.MouseEvent) => {
      // Only process the click event if the toolbar itself was clicked, not e.g. a button
      if (event.currentTarget === event.target) {
        onDoubleClick?.();
      }
    },
    [onDoubleClick],
  );
  return (
    <div
      className={cx(styles.toolbar, className, {
        [styles.insetToolbar as string]: insetToolbar,
      })}
      onDoubleClick={clickHandler}
    >
      {props.children}
    </div>
  );
}

Toolbar.displayName = "Toolbar";

export default Toolbar;
