import { Headers } from "actions-on-google";

export async function asyncForEach<T>(
  array: T[],
  callback: (item: T, index: number, array: T[]) => Promise<void>
): Promise<void> {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export const cToF = (c: number, absolute = true): number =>
  Math.round(c * (9 / 5) + (absolute ? 32 : 0));

export const fToC = (f: number, absolute = true): number =>
  ((f - (absolute ? 32 : 0)) * 5) / 9;

export function getBearerToken(headers: Headers): string | undefined {
  let authorization = headers["authorization"];
  if (Array.isArray(authorization)) {
    authorization = authorization[authorization.length - 1];
  }

  const token = (authorization ?? "").substr(7);

  if (token.length === 0) return undefined;

  return token;
}

export function isNotNull<T>(input: T | null | undefined): input is T {
  if (input === null || input === undefined) return false;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const testDummy: T = input;
  return true;
}
