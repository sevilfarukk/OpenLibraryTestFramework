export function assertDefined<T>(value: T | undefined | null, fieldName: string): T {
  if (value === undefined || value === null) {
    throw new Error(`Expected ${fieldName} to be defined.`);
  }

  return value;
}

export function assertArrayNotEmpty<T>(value: T[] | undefined, fieldName: string): T[] {
  if (!value || value.length === 0) {
    throw new Error(`Expected ${fieldName} to be a non-empty array.`);
  }

  return value;
}
