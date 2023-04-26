import type { ThemeConfig } from '@rise4fun/docusaurus-theme-side-editor';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function useSideEditorConfig() {
  const { siteConfig } = useDocusaurusContext();
  const { themeConfig } = siteConfig;
  const { sideEditor: config } = themeConfig as ThemeConfig;
  if (!config) throw new Error('themeConfig.sideEditor not configured');
  return config;
}
