import createContext from "../context";

import { create, AccessTokenPayload } from "../../utils/auth";

describe("user", () => {
  test("it extracts user information from the Bearer token", () => {
    const token = create<AccessTokenPayload>(
      {
        userId: "uid",
        accessToken: "aToken",
        email: "example@example.com",
      },
      "access"
    );
    const context = createContext({
      req: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });

    expect(context).toEqual(
      expect.objectContaining({
        user: {
          id: "uid",
          accessToken: "aToken",
          email: "example@example.com",
        },
      })
    );
  });

  test("it provides a null user for an invalid token", () => {
    const context = createContext({
      req: {
        headers: {
          authorization: "Bearer invalid",
        },
      },
    });

    expect(context).toEqual(
      expect.objectContaining({
        user: null,
      })
    );
  });
});
