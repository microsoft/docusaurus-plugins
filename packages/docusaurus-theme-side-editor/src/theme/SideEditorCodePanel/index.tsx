import React, { useEffect, useRef, useState } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import useSideEditorContext from '../../client/SideEditorContext';
import useHtmlDataTheme from '../../client/useHtmlDataTheme';
import type { Props } from '@theme/SideEditorCodePanel';

import styles from './styles.module.css';
import clsx from 'clsx';

export default function SideEditorCodePanel(props: Props) {
  const { className } = props;
  const { source, setSource } = useSideEditorContext();
  const { editorId, text, config } = source || {};
  const { language = 'js' } = config || {};
  const colorMode = useHtmlDataTheme();
  const editorRef = useRef(null);
  const monaco = useMonaco();
  const theme = colorMode === 'dark' ? 'vs-dark' : 'light';
  const [value, setValue] = useState(text || '');
  useEffect(() => {
    setValue(text || '');
  }, [editorId, text]);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
  };
  const handleEditorChange = (value: string | undefined) => setValue(value || '');

  const handleClick = () => setSource(editorId, value);
  return (
    <div className={styles.outer}>
      <div className={styles.editor}>
        <Editor
          className={className}
          language={language}
          value={value}
          theme={theme}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
        />
      </div>
      <div className={styles.buttons}>
        <button
          type="button"
          title="Run tool"
          className={clsx(className || 'button button--primary')}
          onClick={handleClick}
        >
          Run
        </button>
      </div>
    </div>
  );
}
