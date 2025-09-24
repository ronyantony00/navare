declare module 'qs' {
  export interface ParseOptions {
    delimiter?: string | RegExp;
    depth?: number | false;
    decoder?: (str: string, decoder: any, charset: string) => any;
    arrayLimit?: number;
    parseArrays?: boolean;
    allowDots?: boolean;
    allowPrototypes?: boolean;
    allowSparse?: boolean;
    parametersLimit?: number;
    strictNullHandling?: boolean;
    plainObjects?: boolean;
    ignoreQueryPrefix?: boolean;
    charset?: string;
    charsetSentinel?: boolean;
    interpretNumericEntities?: boolean;
    comma?: boolean;
  }

  export interface StringifyOptions {
    delimiter?: string;
    strictNullHandling?: boolean;
    skipNulls?: boolean;
    encode?: boolean;
    encoder?: (str: string, charset: string) => string;
    filter?: Array<string | number> | ((prefix: string, value: any) => any);
    arrayFormat?: 'indices' | 'brackets' | 'repeat' | 'comma';
    indices?: boolean;
    sort?: (a: any, b: any) => number;
    serializeDate?: (d: Date) => string;
    format?: 'RFC1738' | 'RFC3986';
    encodeValuesOnly?: boolean;
    addQueryPrefix?: boolean;
    allowDots?: boolean;
    charset?: string;
    charsetSentinel?: boolean;
  }

  export function parse(str: string, options?: ParseOptions): any;
  export function stringify(obj: any, options?: StringifyOptions): string;

  const qs: {
    parse: typeof parse;
    stringify: typeof stringify;
  };

  export default qs;
}
