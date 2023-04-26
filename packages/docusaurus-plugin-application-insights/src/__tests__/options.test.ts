import { describe, it, expect } from 'vitest';
import { normalizePluginOptions } from '@docusaurus/utils-validation';
import { validateOptions } from '../index';
import type { Options, ApplicationInsightsOptions } from '../options';
import type { Validate } from '@docusaurus/types';

function testValidateOptions(options: Options) {
  return validateOptions({
    validate: normalizePluginOptions as Validate<Options, ApplicationInsightsOptions>,
    options,
  });
}

describe('application-insights options', () => {
  it('throws for undefined options', () => {
    expect(
      // @ts-expect-error: TS should error
      () => testValidateOptions(undefined)
    ).toThrowErrorMatchingInlineSnapshot(
      '"\\"value\\" must contain at least one of [instrumentationKey, connectionString]"'
    );
  });

  it('throws for null options', () => {
    expect(
      // @ts-expect-error: TS should error
      () => testValidateOptions(null)
    ).toThrowErrorMatchingInlineSnapshot('"\\"value\\" must be of type object"');
  });

  it('throws for empty object options', () => {
    expect(() => testValidateOptions({})).toThrowErrorMatchingInlineSnapshot(
      '"\\"value\\" must contain at least one of [instrumentationKey, connectionString]"'
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
      () => testValidateOptions({ instrumentationKey: null })
    ).toThrowErrorMatchingInlineSnapshot('"\\"instrumentationKey\\" must be a string"');
  });

  it('throws for number instrumentationKey', () => {
    expect(
      // @ts-expect-error: TS should error
      () => testValidateOptions({ instrumentationKey: 42 })
    ).toThrowErrorMatchingInlineSnapshot('"\\"instrumentationKey\\" must be a string"');
  });

  it('throws for null connectionString', () => {
    expect(
      // @ts-expect-error: TS should error
      () => testValidateOptions({ connectionString: null })
    ).toThrowErrorMatchingInlineSnapshot('"\\"connectionString\\" must be a string"');
  });

  it('throws for number connectionString', () => {
    expect(
      // @ts-expect-error: TS should error
      () => testValidateOptions({ connectionString: 42 })
    ).toThrowErrorMatchingInlineSnapshot('"\\"connectionString\\" must be a string"');
  });

  it('validates missing options', () => {
    let options = {};

    expect(() => {
      testValidateOptions(options);
    }).toThrowErrorMatchingInlineSnapshot(
      '"\\"value\\" must contain at least one of [instrumentationKey, connectionString]"'
    );
  });

  it('validates if xor options are used together', () => {
    let options = {
      instrumentationKey: 'KEY',
      connectionString: 'CONNECTION_STRING',
    };

    expect(() => {
      testValidateOptions(options);
    }).toThrowErrorMatchingInlineSnapshot(
      '"\\"value\\" contains a conflict between exclusive peers [instrumentationKey, connectionString]"'
    );
  });

  it.each([
    [
      'instrumentationKey',
      {
        instrumentationKey: 'KEY',
        connectionString: '',
      },
      { id: 'default', instrumentationKey: 'KEY' },
    ],
    [
      'connectionString',
      {
        instrumentationKey: '',
        connectionString: 'CONNECTION_STRING',
      },
      { id: 'default', connectionString: 'CONNECTION_STRING' },
    ],
  ])('validates if %s option is individually valid', (_, options, expected) => {
    expect(testValidateOptions(options)).toEqual(expected);
  });
});
