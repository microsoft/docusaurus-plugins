import { describe, it, expect } from 'vitest';
import { normalizePluginOptions } from '@docusaurus/utils-validation';
import { validateOptions } from '../index';
import { Options, PluginOptions, normalizeConfig } from '../options';
import type { Validate } from '@docusaurus/types';

function testValidateOptions(options: Options) {
  return validateOptions({
    validate: normalizePluginOptions as Validate<Options, PluginOptions>,
    options,
  });
}

describe('application-insights options', () => {
  it('throws for undefined options', () => {
    expect(
      // @ts-expect-error: TS should error
      () => testValidateOptions(undefined)
    ).toThrowErrorMatchingInlineSnapshot('"\\"config\\" is required"');
  });

  it('throws for null options', () => {
    expect(
      // @ts-expect-error: TS should error
      () => testValidateOptions(null)
    ).toThrowErrorMatchingInlineSnapshot('"\\"value\\" must be of type object"');
  });

  it('throws for empty object options', () => {
    expect(() => testValidateOptions({} as unknown as Options)).toThrowErrorMatchingInlineSnapshot(
      '"\\"config\\" is required"'
    );
  });

  it('throws for number options', () => {
    expect(
      // @ts-expect-error: TS should error
      () => testValidateOptions(42)
    ).toThrowErrorMatchingInlineSnapshot('"\\"value\\" must be of type object"');
  });

  it('throws for null instrumentationKey', () => {
    expect(
      // @ts-expect-error: TS should error
      () => testValidateOptions({ config: { instrumentationKey: null } })
    ).toThrowErrorMatchingInlineSnapshot('"\\"config.instrumentationKey\\" must be a string"');
  });

  it('throws for number instrumentationKey', () => {
    expect(
      // @ts-expect-error: TS should error
      () => testValidateOptions({ config: { instrumentationKey: 42 } })
    ).toThrowErrorMatchingInlineSnapshot('"\\"config.instrumentationKey\\" must be a string"');
  });

  it('throws for null connectionString', () => {
    expect(
      // @ts-expect-error: TS should error
      () => testValidateOptions({ config: { connectionString: null } })
    ).toThrowErrorMatchingInlineSnapshot('"\\"config.connectionString\\" must be a string"');
  });

  it('throws for number connectionString', () => {
    expect(
      // @ts-expect-error: TS should error
      () => testValidateOptions({ config: { connectionString: 42 } })
    ).toThrowErrorMatchingInlineSnapshot('"\\"config.connectionString\\" must be a string"');
  });

  it('validates missing options', () => {
    let options = {
      config: {},
    };

    expect(() => {
      testValidateOptions(options);
    }).toThrowErrorMatchingInlineSnapshot(
      '"\\"config\\" must contain at least one of [instrumentationKey, connectionString]"'
    );
  });

  it('validates if xor options are used together', () => {
    let options = {
      config: {
        instrumentationKey: 'KEY',
        connectionString: 'CONNECTION_STRING',
      },
    };

    expect(() => {
      testValidateOptions(options);
    }).toThrowErrorMatchingInlineSnapshot(
      '"\\"config\\" contains a conflict between exclusive peers [instrumentationKey, connectionString]"'
    );
  });

  it('normalizeConfig returns options when new configuration format used', () => {
    let options = {
      config: {
        instrumentationKey: 'KEY',
      },
      enableClickAnalytics: true,
    };

    expect(normalizeConfig(options)).toMatchInlineSnapshot(`
      {
        "config": {
          "instrumentationKey": "KEY",
        },
        "enableClickAnalytics": true,
      }
    `);
  });

  it('normalizeConfig returns new configuration format when legacy configuration format used', () => {
    let options = {
      instrumentationKey: 'KEY',
    };

    expect(normalizeConfig(options)).toMatchInlineSnapshot(`
      {
        "config": {
          "instrumentationKey": "KEY",
        },
        "enableClickAnalytics": false,
      }
    `);
  });
});
