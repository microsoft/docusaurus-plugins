import useIsBrowser from '@docusaurus/useIsBrowser';
export default function useHtmlDataTheme() {
  const isBrowser = useIsBrowser();
  const colorMode = isBrowser ? (document.firstElementChild as HTMLElement).dataset.theme : 'dark';
  return colorMode;
}
