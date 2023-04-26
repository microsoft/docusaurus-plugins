import React, { useRef, useEffect } from 'react';
import type { Props } from '@theme/IFrameEditor';
import styles from './styles.module.css';
import clsx from 'clsx';
import useHtmlDataTheme from '../../client/useHtmlDataTheme';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function IFrameEditor(props: Props) {
  const { config, source = {} } = props;
  const { text } = source;
  const {
    id,
    title,
    lightUrl,
    darkUrl,
    message = {},
    readyMessage,
    className,
    messageTextFieldName = 'text',
    messageIdFieldName = 'mid',
    allow = 'accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; usb; xr-spatial-tracking; serial; bluetooth',
    sandbox = 'allow-forms allow-scripts allow-downloads allow-modals allow-popups allow-presentation allow-same-origin allow-scripts',
  } = config;
  const colorMode = useHtmlDataTheme();
  const url = useBaseUrl(colorMode === 'dark' ? darkUrl : lightUrl);
  const frameId = `${id}-editor-frame`;
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const postSource = () => {
    const iframe = iframeRef.current;
    const editorWindow = iframe?.contentWindow;
    if (!editorWindow) return;

    const id = Math.random() + '';
    const msg = {
      ...message,
      [messageIdFieldName]: id,
      [messageTextFieldName]: text,
    };
    editorWindow.postMessage(msg, '*');
  };

  // when source changes
  useEffect(() => postSource(), [url, source]);

  // sniff for a ready message from the iframe
  useEffect(() => {
    if (!readyMessage || typeof window === 'undefined') return;

    const iframe = iframeRef.current;
    const editorWindow = iframe?.contentWindow;
    if (!editorWindow) return;

    const handleMessage = (ev: MessageEvent) => {
      const { data } = ev;
      if (Object.entries(readyMessage).every(([key, value]) => data[key] === readyMessage[key])) {
        window.removeEventListener('message', handleMessage);
        postSource();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [url]);

  return (
    <iframe
      id={frameId}
      aria-label={title || id}
      ref={iframeRef}
      className={clsx(styles.iframeEditor, className)}
      allow={allow}
      sandbox={sandbox}
      src={url}
    />
  );
}
