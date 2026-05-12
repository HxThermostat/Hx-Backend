import { randomBytes } from "crypto";

import { advanceTo, clear, advanceBy } from "jest-date-mock";

import {
  create,
  decode,
  AccessTokenPayload,
  encodeTotp,
  decodeTotp,
} from "../auth";

import { generatePassword } from "../ayla";

describe("JWT", () => {
  beforeAll(() => {
    advanceTo(new Date(2020, 6, 1, 0, 0, 0));
  });

  afterAll(() => {
    clear();
  });

  test("it creates a valid", () => {
    const jwt = create<AccessTokenPayload>(
      {
        userId: "123",
        accessToken: "access",
        email: "example@example.com",
      },
      "test"
    );

    const payload = decode<AccessTokenPayload>(jwt, "test");

    expect(payload).toEqual(
      expect.objectContaining({
        userId: "123",
        accessToken: "access",
        email: "example@example.com",
      })
    );
  });

  test("it respects token expiration", () => {
    const jwt = create<AccessTokenPayload>(
      {
        userId: "123",
        accessToken: "access",
        email: "example@example.com",
      },
      "test",
      "1d"
    );

    // Just over one day
    advanceBy(24 * 60 * 60 * 1000 + 1);

    expect(() => decode<AccessTokenPayload>(jwt, "test")).toThrow();
  });

  test("it respects the issuer", () => {
    const jwt = create<AccessTokenPayload>(
      {
        userId: "123",
        accessToken: "access",
        email: "example@example.com",
      },
      "test"
    );

    expect(() => decode<AccessTokenPayload>(jwt, "invalid")).toThrow();
  });
});

describe("TOTP", () => {
  const email = "example@example.com";
  const password = "password";

  let totp: string;

  beforeEach(() => {
    totp = encodeTotp(email, password);
  });

  test("it generates unique TOTPs", () => {
    const totp2 = encodeTotp(email, "otherPassword");

    expect(totp).not.toEqual(totp2);
  });

  test("it decodes a valid TOTP", () => {
    const decoded = decodeTotp(email, totp);

    expect(decoded).toEqual(password);
  });

  test("a TOTP is valid for 7 days", () => {
    advanceBy(1000 * 60 * 60 * 24 * 7 - 1000);

    expect(decodeTotp(email, totp)).toEqual(password);

    // Needs to extend past the grace window
    advanceBy(1000 * 60 * 15);

    expect(decodeTotp(email, totp)).toBe(undefined);
  });

  test("it fails to decode an invalid TOTP", () => {
    expect(decodeTotp(email, "invalid")).toBe(undefined);
  });

  test("it fails to decode a valid TOTP with the wrong email", () => {
    expect(decodeTotp("other@example.com", totp)).toBe(undefined);
  });

  test("it fuzzily generates valid TOTPs", () => {
    const makeEmail = (): string =>
      `${randomBytes(8).toString("hex")}@${randomBytes(4).toString("hex")}.com`;

    // For a more exhaustive test, bump this up to 100,000 or 1,000,000
    // (we're keeping the default low since it does take time to run)
    for (let i = 0; i < 10000; i++) {
      const email = makeEmail();
      const password = generatePassword(email);

      const totp = encodeTotp(email, password);

      expect([email, password, totp, decodeTotp(email, totp)]).toEqual(
        expect.arrayContaining([email, password, totp, password])
      );
      expect([totp, /^[0-9a-zA-Z\-_]{17}$/.test(totp)]).toEqual(
        expect.arrayContaining([totp, true])
      );
    }
  });
});
