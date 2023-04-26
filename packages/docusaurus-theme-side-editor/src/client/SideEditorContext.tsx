import SideEditorRoot from '@theme/SideEditorRoot';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import type { SideEditorConfig } from '@rise4fun/docusaurus-theme-side-editor';
import useSideEditorConfig from './useSideEditorConfig';

export interface SideEditorSource {
  editorId: string;
  text: string | undefined;
  config: SideEditorConfig;
}

export interface SideEditorProps {
  setSource: (editorId: string | undefined, text: string | undefined) => void;
  source?: SideEditorSource;
}

const dummySetSource = () => {};
export const SideEditorContext = createContext<SideEditorProps>({
  setSource: dummySetSource,
});
SideEditorContext.displayName = 'SideEditor';

export function SplitEditorProvider(props: { children: ReactNode }) {
  const { children } = props;
  const { editors } = useSideEditorConfig();

  const [source, setSource_] = useState<SideEditorSource | undefined>();
  const setSource = (editorId: string | undefined, text: string | undefined) => {
    const editorConfig = editors.find(({ id }) => id === editorId);
    if (!editorId || !editorConfig) setSource_(undefined);
    else {
      const newSource = { editorId, text, config: editorConfig };
      setSource_(newSource);
    }
  };

  return (
    <SideEditorContext.Provider value={{ setSource, source }}>
      {source !== undefined ? <SideEditorRoot {...props} /> : <>{children}</>}
    </SideEditorContext.Provider>
  );
}

export default function useSideEditorContext() {
  const ctx = useContext(SideEditorContext);
  if (ctx.setSource === dummySetSource)
    throw new Error('SideEditor not properly configured. Did you swizzle Root?');
  return ctx;
}
