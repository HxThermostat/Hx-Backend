import { createHmac } from "crypto";

import { totp } from "otplib";
import { KeyEncodings } from "otplib/core";

import { chunk, zip as lozip } from "lodash";

import { PASSWORD_LENGTH, TOTP_SECRET } from "./config";

const SHIFT_CYCLES = 36;
const TOTP_STEP = 600;
const TOTP_DIGITS = PASSWORD_LENGTH;

const keyEndoding: KeyEncodings = KeyEncodings.HEX;

totp.options = {
  encoding: keyEndoding,
  digits: TOTP_DIGITS,
  step: TOTP_STEP,
  window: [(60 * 60 * 24 * 7) / TOTP_STEP, 1], // keep codes valid for 7 days
};

const totpSecret = (email: string): string =>
  createHmac("sha256", TOTP_SECRET)
    .update(email)
    .digest(keyEndoding);

const shift = (char: string, shifts: number): string => {
  // Convenience affordance to recusively deal with strings
  if (char.length > 1) {
    return char
      .split("")
      .map(c => shift(c, shifts))
      .join("");
  }

  const adjustment = shifts > 0 ? 1 : -1;

  let shifted = char.charCodeAt(0);
  let remaining = Math.abs(shifts);

  while (remaining > 0) {
    shifted += adjustment;
    remaining -= 1;

    if (adjustment === 1) {
      // Move ',' => '/'
      if (shifted === 44) {
        shifted = 47;
      }
      // Move ':' => 'A'
      else if (shifted > 57 && shifted < 65) {
        shifted += 7;
      }
      // Move '[' => 'a'
      else if (shifted > 90 && shifted < 97) {
        shifted += 6;
      }
      // Move '{' => '+'
      else if (shifted === 123) {
        shifted = 43;
      }
      // Move '|' => '/'
      else if (shifted === 124) {
        shifted = 47;
      }
      // Move '}' => '0'
      else if (shifted > 124) {
        shifted -= 77;
      }
    } else {
      // Move '*' => 'z'
      if (shifted === 42) {
        shifted = 122;
      }
      // Move '.' => '+'
      else if (shifted === 46) {
        shifted = 43;
      }
      // Move '@' => '9'
      else if (shifted > 57 && shifted < 65) {
        shifted -= 7;
      }
      // Move '`' => 'Z'
      else if (shifted > 90 && shifted < 97) {
        shifted -= 6;
      }
    }
  }

  return String.fromCharCode(shifted);
};

const digest = (input: string): number =>
  createHmac("sha256", TOTP_SECRET)
    .update(input)
    .digest()
    .readUInt8();

const segmentLength = (shifts: number): number => (shifts % TOTP_DIGITS) + 1;

const zip = (otp: string, password: string, size: number): string => {
  return lozip(chunk(otp, size), chunk(password, size))
    .flat(2)
    .join("");
};

const unzip = (_zipped: string, size: number): [string, string] => {
  const zipped = Array.from(_zipped);

  if (zipped.length % 2 !== 0) throw new Error();

  const length = zipped.length / 2;
  size = Math.min(length, size);

  let otp = "";
  let password = "";

  // Get all the size-sized chunks first
  for (let i = 0; i < Math.floor(length / size); i++) {
    for (let j = 0; j < size; j++) {
      otp += zipped.shift();
    }

    for (let j = 0; j < size; j++) {
      password += zipped.shift();
    }
  }

  const remainder = zipped.length;

  if (remainder % 2 !== 0) throw new Error();

  for (let i = 0; i < remainder / 2; i++) {
    otp += zipped.shift();
  }

  for (let i = 0; i < remainder / 2; i++) {
    password += zipped.shift();
  }

  if (zipped.length) throw new Error();

  return [otp, password];
};

const alphaCount = (str: string): number => str.replace(/[0-9]/g, "").length;

// Concatenates the password and otp in a way that attempts to
// obfuscate their component parts. This is *not* secure; however,
// it's not strictly meant to be. We're giving users a mechanism to
// share their login with other members of their household. There is
// naturally a level of trust in that sharing dynamic. We also provide
// another mechanism for a user to extract their password. The goal
// here is simply to make it unobvious that this string contains the
// password.
const obfuscate = (email: string, password: string, otp: string): string => {
  // Establish a few example values to be used in the documentation
  // for this function:
  // email: test@example.com
  // passowrd: password
  // otp: 12345678

  // We're going to shift individual characters a pseudorandom number
  // of times which will change with every unique otp value
  const shifts = ((digest(otp) % SHIFT_CYCLES) + digest(email)) % 36; // 29
  const shifts36 = shifts.toString(36); // 't'

  // Combine the two strings a chunk at a time
  const chunk = segmentLength(shifts); // 6
  const zipped = zip(otp, password, chunk); // '123456passwo78rd'

  // Shift the characters by a fixed amount on the ASCII table (and
  // wrap to the nearest valid character)
  const shifted = shift(zipped, shifts); // 'UVWXYZI3LLPHabK6'

  // 1/2 of the time, we'll reverse the string
  const flipped = // 'UVWXYZI3LLPHabK6'
    shifts % 2 === 0
      ? shifted
          .split("")
          .reverse()
          .join("")
      : shifted;

  // 1/3 of the time, we'll cut the string in half and swap the left
  // and right halves
  const obfuscated = // 'UVWXYZI3LLPHabK6'
    shifts % 3 === 0
      ? flipped.slice(0, flipped.length / 2) + flipped.slice(flipped.length / 2)
      : flipped;

  // And finally, add the number of shifts performed to the string. We
  // add it to the string at the position determined by the number of
  // alpha characters in the string (including shift36) so that we can
  // easily extract that number on the decoding side without making it
  // statically the pre- or postamble
  const withShifts = Array.from(obfuscated); // ['U','V','W','X','Y','Z','I','3','L','L','P','H','a','b','K','6']

  const start = alphaCount(obfuscated + shifts36); // 15
  withShifts.splice(start, 0, shifts36); // ['U','V','W','X','Y','Z','I','3','L','L','P','H','a','b','K','t','6']

  // Replace the base64-encoded characters that aren't URL-safe
  const urlSafe = withShifts // 'UVWXYZI3LLPHabKt6'
    .join("")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return urlSafe;
};

// This is strictly the opposite of obfuscate
const deobfuscate = (ototp: string): [string, string] => {
  const withShifts = Array.from(ototp.replace(/-/g, "+").replace(/_/g, "/"));
  const [shifts36] = withShifts.splice(
    Math.min(alphaCount(ototp), ototp.length - 1),
    1
  );
  const shifts = parseInt(shifts36, 36);

  const obfuscated = withShifts.join("");

  const flipped =
    shifts % 3 === 0
      ? obfuscated.slice(0, obfuscated.length / 2) +
        obfuscated.slice(obfuscated.length / 2)
      : obfuscated;

  const shifted =
    shifts % 2 === 0
      ? flipped
          .split("")
          .reverse()
          .join("")
      : flipped;

  const zipped = shift(shifted, -shifts);
  const [otp, password] = unzip(zipped, segmentLength(shifts));

  return [otp, password];
};

export const encodeTotp = (email: string, password: string): string => {
  const otp = totp.generate(totpSecret(email));

  return obfuscate(email, password, otp);
};

export const decodeTotp = (
  email: string,
  ototp: string
): string | undefined => {
  try {
    const [otp, password] = deobfuscate(ototp);

    if (totp.check(otp, totpSecret(email))) {
      return password;
    }
  } catch {
    // A failed decode doesn't need a result
  }
};
