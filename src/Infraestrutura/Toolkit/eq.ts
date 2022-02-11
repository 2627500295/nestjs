/* eslint no-self-compare: "off" */
export function eq(value: any, other: any): boolean {
  return value === other || (value !== value && other !== other);
}
