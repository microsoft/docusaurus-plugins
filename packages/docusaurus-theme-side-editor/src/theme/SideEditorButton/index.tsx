import React from 'react';
import type { Props } from '@theme/SideEditorButton';
import useSideEditorContext from '../../client/SideEditorContext';
import clsx from 'clsx';

import styles from './styles.module.css';

export default function SideEditorButton(props: Props) {
  const { className, editorId, text, label = 'Edit', title = 'Load code in side editor' } = props;
  const { setSource } = useSideEditorContext();

  const handleClick = () => setSource(editorId, text);
  return (
    <button
      type="button"
      title={title}
      className={clsx(styles.hidemobile, styles.mr1, className || 'button button--primary')}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
