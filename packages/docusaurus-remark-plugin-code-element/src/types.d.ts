/**
 * Plugin options.
 */
export interface PluginOptions {
  langs: [
    {
      /**
       * Code section identifier
       */
      lang: string;
      /**
       * React element name to be imported from `@theme/element`
       */
      element: string;
    }
  ];
}
