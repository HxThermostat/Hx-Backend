import { generateUserNameFromEmail } from "../sendbird";

describe("SendBird Utils", () => {
  test("generates consistent names", () => {
    const email = "jacob@kraftful.com";
    const expected = generateUserNameFromEmail(email);
    const results = [
      generateUserNameFromEmail(email),
      generateUserNameFromEmail(email),
      generateUserNameFromEmail(email),
    ];

    expect(results).toStrictEqual([expected, expected, expected]);
  });
});
