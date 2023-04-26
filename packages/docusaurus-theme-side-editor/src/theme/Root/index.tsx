import React, { ReactNode } from 'react';
import Root from '@theme-original/Root';
import { SplitEditorProvider } from '../../client/SideEditorContext';

// Root that mounts SplitEditorProvider in the React tree
export default function RootWrapper(props: { children: ReactNode }) {
  const { children } = props;
  if (Root === RootWrapper) return <SplitEditorProvider>{children}</SplitEditorProvider>;
  else
    return (
      <SplitEditorProvider>
        <Root>{children}</Root>
      </SplitEditorProvider>
    );
}
