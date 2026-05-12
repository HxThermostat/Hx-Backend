import { setupPolly } from "test-utils";

setupPolly(__dirname);

import { Client } from "../client";

// The authorization header isn't used by Polly to determine if a recording is
// out-of-date, so this specific value doesn't matter for the tests once the
// recording has been made. You can update this with a valid token value if
// those recordings need to be updated.
const TOKEN = "f57441e1cdba4c50a9ebe4ff659b983c";

describe("user service", () => {
  const client = new Client();
  describe("checkEmail", () => {
    test("a taken email address resolves to false", () => {
      const p = client.checkEmail("kraftfulho@gmail.com");

      return expect(p).resolves.toEqual(false);
    });

    test("an available email address resolves to true", () => {
      const p = client.checkEmail("kraftfulho+available@gmail.com");

      return expect(p).resolves.toEqual(true);
    });
  });

  describe("signUp", () => {
    test("a valid request resolves", () => {
      const p = client.signUp(
        "nicky+signupvalid2@kraftful.com",
        "Test1234!",
        "Nicky",
        "Leach",
        "USA"
      );

      return expect(p).resolves.toEqual(undefined);
    });

    test("an invalid request throws", () => {
      const p = client.signUp("kraftfulho@gmail.com", "", "Nicky", "", "USA");

      return expect(p).rejects.toThrow();
    });
  });

  describe("confirmEmail", () => {
    test("a valid request resolves", () => {
      const p = client.confirmEmail("avFdQFvt");

      return expect(p).resolves.toEqual(undefined);
    });

    test("an invalid code throws", () => {
      const p = client.confirmEmail("invalid");

      return expect(p).rejects.toThrow();
    });
  });

  describe("sendConfirmationEmail", () => {
    test("a valid request resolves", () => {
      const p = client.sendConfirmationEmail("nicky+bob3@kraftful.com");

      return expect(p).resolves.toEqual(undefined);
    });

    test("an invalid email throws", () => {
      const p = client.sendConfirmationEmail("kraftfulho@gmail.com");

      return expect(p).rejects.toThrow();
    });
  });

  describe("login", () => {
    test("a successful login returns the correct fields", () => {
      const p = client.login("kraftfulho@gmail.com", "Test1234!");

      return expect(p).resolves.toMatchSnapshot();
    });

    test("a failed login throws", () => {
      const p = client.login("me@example.com", "invalid");

      return expect(p).rejects.toThrowError(
        "Request failed with status code 401"
      );
    });
  });

  describe("sendPasswordResetEmail", () => {
    test("a valid request resolves", () => {
      const p = client.sendPasswordResetEmail("kraftfulho@gmail.com");

      return expect(p).resolves.toEqual(undefined);
    });

    test("an invalid email throws", () => {
      const p = client.sendPasswordResetEmail("nicky+bob3@kraftful.com");

      return expect(p).rejects.toThrow();
    });
  });

  describe("resetPassword", () => {
    test("an invalid password rejects", () => {
      const p = client.resetPassword("T5pjH3MT", "invalid");

      return expect(p).rejects.toThrow();
    });

    test("a valid request resolves", () => {
      const p = client.resetPassword("T5pjH3MT", "Test1234");

      return expect(p).resolves.toEqual(undefined);
    });
  });

  describe("changePassword", () => {
    test("an invalid current password rejects", () => {
      const p = client.setToken(TOKEN).changePassword("invalid", "Test1234!");

      return expect(p).rejects.toThrow();
    });

    test("a valid request resolves", () => {
      const p = client
        .setToken(TOKEN)
        .changePassword("Test1234!", "Newpassw0rd");

      return expect(p).resolves.toEqual(undefined);
    });
  });

  describe("profile", () => {
    test("it returns the correct fields", () => {
      const p = client.profile(TOKEN);

      return expect(p).resolves.toMatchSnapshot();
    });
  });

  describe("refreshToken", () => {
    test("it returns the correct fields", () => {
      const p = client.refreshToken("765f937ca2954a448e8906762755136b");

      return expect(p).resolves.toMatchSnapshot();
    });
  });
});

describe("device service", () => {
  const client = new Client(TOKEN);

  describe("devices", () => {
    test("it returns the correct fields", () => {
      const p = client.devices();

      return expect(p).resolves.toMatchSnapshot();
    });
  });

  describe("device", () => {
    test("it formats fields for a ZoningDevice", () => {
      const p = client.device("AC000W001132899");

      return expect(p).resolves.toMatchSnapshot();
    });
    test("it formats fields for a NonZoningDevice", () => {
      const p = client.device("AC000W000426300");

      return expect(p).resolves.toMatchSnapshot();
    });
  });

  describe("metadata", () => {
    const client = new Client(TOKEN);

    describe("metadata", () => {
      test("it returns the correct fields", () => {
        const p = client.metadata("AC000W000426300");

        return expect(p).resolves.toMatchSnapshot();
      });
    });

    describe("setMetadata", () => {
      test("it returns  the correct fields", () => {
        const p = client.setMetadata("AC000W000426300", "RoomName", "Bedroom");

        return expect(p).resolves.toMatchSnapshot();
      });
    });
  });

  describe("datapoints", () => {
    const client = new Client(TOKEN);

    describe("batchDatapoints", () => {
      test("it returns the correct fields", () => {
        const dsn = "AC000W000426300";
        const p = client.batchDatapoints(
          client.datapoint(dsn, "UsrMd1Prev", 3),
          client.datapoint(dsn, "UsrMd1", 1)
        );

        return expect(p).resolves.toMatchSnapshot();
      });

      test("it skips when no datapoints have been provided", () => {
        const p = client.batchDatapoints();

        // NOTE: Using Polly it's not super trivial for us to mock the HTTP
        // client to assert that a method was not called so instead we just need
        // to make sure that Polly doesn't record a request for this spec
        return expect(p).resolves.toMatchSnapshot();
      });
    });
  });
});
