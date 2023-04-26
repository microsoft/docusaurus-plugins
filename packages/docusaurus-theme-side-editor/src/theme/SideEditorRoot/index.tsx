import React, { createElement, lazy, LazyExoticComponent, Suspense, useMemo } from 'react';
import type { Props } from '@theme/SideEditorRoot';
import { Panel, PanelGroup } from 'react-resizable-panels';
import useSideEditorContext from '../../client/SideEditorContext';
import useSideEditorConfig from '../../client/useSideEditorConfig';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ResizeHandle from './ResizeHandle';
const IFrameEditor = lazy(() => import('@theme/IFrameEditor'));
const SideEditorCodePanel = lazy(() => import('@theme/SideEditorCodePanel'));

export default function SideEditorRoot(props: Props) {
  const { children } = props;
  const { persistenceId } = useSideEditorConfig();
  const { source } = useSideEditorContext();
  const { editorId, config } = source || {};
  const { language } = config || {};

  const autoSaveId = persistenceId ? `${persistenceId}/horizontal` : undefined;
  const autoSaveIdV = persistenceId ? `${persistenceId}/vertical` : undefined;

  // no split
  if (!editorId || !config) return children;

  const { type } = config;
  // split enabled
  const elementType: LazyExoticComponent<(props: any) => JSX.Element> | undefined = useMemo(() => {
    switch (type) {
      case 'iframe':
        return IFrameEditor;
      default:
        return undefined;
    }
  }, [type]);

  if (!elementType) return children;

  const editorProps = { config, source };

  const editor = (
    <BrowserOnly>
      {() => (
        <div style={{ overflow: 'auto', height: '100%' }}>
          <Suspense fallback={null}>{createElement(elementType, editorProps)}</Suspense>
        </div>
      )}
    </BrowserOnly>
  );

  return (
    <div style={{ height: '100vh' }}>
      <PanelGroup autoSaveId={autoSaveId} direction="horizontal">
        <Panel>
          <div style={{ overflow: 'auto', height: '100%' }}>{children}</div>
        </Panel>
        <ResizeHandle />
        <Panel collapsible={true}>
          {language ? (
            <PanelGroup autoSaveId={autoSaveIdV} direction="vertical">
              <Panel>
                <Suspense fallback={null}>
                  <SideEditorCodePanel />
                </Suspense>
              </Panel>
              <ResizeHandle direction="vertical" />
              <Panel>{editor}</Panel>
            </PanelGroup>
          ) : (
            editor
          )}
        </Panel>
      </PanelGroup>
    </div>
  );
}
