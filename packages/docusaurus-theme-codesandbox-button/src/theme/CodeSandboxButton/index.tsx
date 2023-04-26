import React, { useState } from 'react';
import type { Props } from '@theme/CodeSandboxButton';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import type {
  CodeSandboxOptions,
  ThemeConfig,
} from '@rise4fun/docusaurus-theme-codesandbox-button';

const DEFAULT_CODESANDBOX: CodeSandboxOptions = {
  files: {
    'package.json': {
      content: {
        dependencies: {},
      },
    },
    'sandbox.config.json': {
      content: {
        template: 'node',
        view: 'terminal',
        container: {
          node: '18',
        },
      },
    },
  },
};

export default function CodeSandboxButton(props: Props) {
  const { siteConfig } = useDocusaurusContext();
  const { themeConfig } = siteConfig;
  const { codeSandbox = {} } = themeConfig as ThemeConfig;
  const { templates, defaultTemplate } = codeSandbox;
  const { className, files, startFile, template = defaultTemplate, label = 'CodeSandbox' } = props;
  const sandbox = templates?.[template || ''] || DEFAULT_CODESANDBOX;

  const [error, setError] = useState<string | undefined>();
  const [importing, setImporting] = useState(false);

  const handleClick = async () => {
    const f = files;
    const body = {
      files: {
        ...(sandbox?.files || {}),
        ...f,
      },
    };
    try {
      setError(undefined);
      setImporting(true);
      const x = await fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!x.ok) throw new Error('codesandbox.io api call failed');
      const data = await x.json();
      const { sandbox_id } = data;
      if (sandbox_id === undefined) throw new Error('failed to create new sandbox');
      let url = `https://codesandbox.io/s/${data.sandbox_id}?`;
      if (startFile) url += `file=/${encodeURIComponent(startFile)}`;
      window.open(url, '_blank', 'noreferrer');
    } catch (error: any) {
      console.error(error);
      setError(error?.message || error + '');
    } finally {
      setImporting(false);
    }
  };

  return (
    <button
      type="button"
      aria-label="Open code in CodeSandbox"
      title={error || 'Open in CodeSandbox'}
      className={clsx(styles.hidemobile, styles.mr1, className || 'button button--secondary')}
      onClick={handleClick}
      disabled={importing}
    >
      {label}
      {error && `!!!`}
    </button>
  );
}
