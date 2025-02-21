export const parseAsString = (value: string | null) => value || '';
export const parseAsTimestamp = (value: string) => new Date(value);
export const parseAsArrayOf = (parser: (val: string) => any, delimiter: string) => 
  (value: string) => value.split(delimiter).map(parser);
export const parseAsInteger = (value: string) => parseInt(value, 10);
export const parseAsStringLiteral = <T extends string>(value: string) => value as T;