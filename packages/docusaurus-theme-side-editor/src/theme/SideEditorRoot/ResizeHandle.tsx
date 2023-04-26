import clsx from 'clsx';
import React from 'react';
import { PanelResizeHandle } from 'react-resizable-panels';

import styles from './ResizeHandle.module.css';

export default function ResizeHandle({
  className = '',
  collapsed = false,
  direction = 'horizontal',
  id,
}: {
  className?: string;
  collapsed?: boolean;
  id?: string;
  direction?: 'horizontal' | 'vertical';
}) {
  return (
    <PanelResizeHandle className={clsx(styles.ResizeHandleOuter, className)} id={id}>
      <div
        className={styles.ResizeHandleInner}
        data-collapsed={collapsed || undefined}
        data-direction={direction}
      >
        ⣿
      </div>
    </PanelResizeHandle>
  );
}
