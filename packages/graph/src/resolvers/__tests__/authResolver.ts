import { setupPolly } from "test-utils";

import { createTestClient } from "apollo-server-testing";
import { ApolloServer, gql } from "apollo-server-express";

import { Client } from "../../ayla";
import buildServer, { buildSchema, loaders } from "../../server";

import * as aylaUtils from "../../utils/ayla";

jest.mock("../../utils/auth");

let server: ApolloServer;

const aylaClient = new Client();

setupPolly(__dirname);

beforeEach(async () => {
  const schema = await buildSchema();
  server = buildServer(schema, {
    user: null,
    loaders: loaders(aylaClient, null),
    aylaClient,
  });
});

describe("checkEmail", () => {
  test("it marks available emails as available", async () => {
    const { mutate } = createTestClient(server);

    const res = await mutate({
      mutation: gql`
        mutation {
          checkEmail(input: { email: "kraftfulho+available@gmail.com" }) {
            available
          }
        }
      `,
    });

    expect(res).toMatchSnapshot();
  });
});

describe("sendToken", () => {
  test("it sends a confirmation email for unconfirmed accounts", async () => {
    const { mutate } = createTestClient(server);

    const sendConfirmationEmail = jest.spyOn(
      aylaClient,
      "sendConfirmationEmail"
    );

    const res = await mutate({
      mutation: gql`
        mutation {
          sendToken(input: { email: "nicky+unconfirmed2@kraftful.com" }) {
            __typename
            ... on SendTokenSuccess {
              accountStatus
            }
          }
        }
      `,
    });

    expect(sendConfirmationEmail).toHaveBeenCalledTimes(1);

    jest.clearAllMocks();

    expect(res).toMatchSnapshot();
  });

  test("it sends a password reset email for confirmed accounts", async () => {
    const { mutate } = createTestClient(server);

    const sendPasswordResetEmail = jest.spyOn(
      aylaClient,
      "sendPasswordResetEmail"
    );

    const res = await mutate({
      mutation: gql`
        mutation {
          sendToken(input: { email: "nicky@kraftful.com" }) {
            __typename
            ... on SendTokenSuccess {
              accountStatus
            }
          }
        }
      `,
    });

    expect(sendPasswordResetEmail).toHaveBeenCalledTimes(1);

    jest.clearAllMocks();

    expect(res).toMatchSnapshot();
  });
});

describe("signUp", () => {
  test("it allows a user to sign up", async () => {
    const { mutate } = createTestClient(server);

    const res = await mutate({
      mutation: gql`
        mutation {
          signUp(
            input: {
              email: "nicky+signupmutation5@kraftful.com"
              firstName: "Nicky"
              lastName: "Leach"
              country: "USA"
            }
          ) {
            __typename
          }
        }
      `,
    });

    expect(res).toMatchSnapshot();
  });

  test("it returns an appropriate error when the email address has been taken", async () => {
    const { mutate } = createTestClient(server);

    const res = await mutate({
      mutation: gql`
        mutation {
          signUp(
            input: {
              email: "kraftfulho@gmail.com"
              firstName: "Nicky"
              lastName: "Leach"
              country: "USA"
            }
          ) {
            __typename
          }
        }
      `,
    });

    expect(res).toMatchSnapshot();
  });
});

describe("signIn", () => {
  test("it allows a user to sign in with a confirmation token", async () => {
    const { mutate } = createTestClient(server);

    jest.spyOn(aylaUtils, "generateKsid").mockImplementationOnce(() => "ksid1");

    const confirmEmail = jest.spyOn(aylaClient, "confirmEmail");
    const writeUserMetadata = jest.spyOn(aylaClient, "writeUserMetadata");
    const changePassword = jest.spyOn(aylaClient, "changePassword");

    const res = await mutate({
      mutation: gql`
        mutation {
          signIn(
            input: {
              email: "nicky+signupmutation4@kraftful.com"
              token: "bCuxGEzu"
            }
          ) {
            __typename
            ... on SignInSuccess {
              accessToken
              refreshToken
              user {
                email
              }
            }
          }
        }
      `,
    });

    expect(confirmEmail).toHaveBeenCalledTimes(1);
    expect(writeUserMetadata).toHaveBeenCalledTimes(1);
    expect(changePassword).toHaveBeenCalledTimes(1);

    jest.clearAllMocks();

    expect(res).toMatchSnapshot();
  });

  test("it allows a user to sign in with a forgot password token", async () => {
    const { mutate } = createTestClient(server);

    jest.spyOn(aylaUtils, "generateKsid").mockImplementationOnce(() => "ksid2");

    const resetPassword = jest.spyOn(aylaClient, "resetPassword");
    const changePassword = jest.spyOn(aylaClient, "changePassword");
    const writeUserMetadata = jest.spyOn(aylaClient, "writeUserMetadata");

    const res = await mutate({
      mutation: gql`
        mutation {
          signIn(
            input: {
              email: "nicky+signupmutation4@kraftful.com"
              token: "tVkoeqsa"
            }
          ) {
            __typename
            ... on SignInSuccess {
              accessToken
              refreshToken
              user {
                email
              }
            }
          }
        }
      `,
    });

    expect(resetPassword).toHaveBeenCalledTimes(1);
    expect(changePassword).toHaveBeenCalledTimes(1);
    expect(writeUserMetadata).not.toHaveBeenCalled();

    jest.clearAllMocks();

    expect(res).toMatchSnapshot();
  });
});

describe("refreshToken", () => {
  test("it allows an access token to be refreshed", async () => {
    const { mutate } = createTestClient(server);

    const refreshToken = jest.spyOn(aylaClient, "refreshToken");
    const login = jest.spyOn(aylaClient, "login");

    const res = await mutate({
      mutation: gql`
        mutation {
          refreshToken(
            input: {
              token: "{\\"userId\\":\\"284d0022-bd73-11ea-bb45-0a580ae995c9\\",\\"refreshToken\\":\\"f6a65423bb864f0c982615772cb53c97\\",\\"email\\":\\"nicky+signupmutation2@kraftful.com\\",\\"ksid\\":\\"ksid1\\"}"
            }
          ) {
            __typename
            ... on RefreshTokenSuccess {
              accessToken
              refreshToken
              ttl
            }
          }
        }
      `,
    });

    expect(refreshToken).toHaveBeenCalledTimes(1);
    expect(login).not.toHaveBeenCalled();

    jest.clearAllMocks();

    expect(res).toMatchSnapshot();
  });

  test("it will fallback to login when the refresh token is invalid", async () => {
    const { mutate } = createTestClient(server);

    const refreshToken = jest.spyOn(aylaClient, "refreshToken");
    const login = jest.spyOn(aylaClient, "login");

    const res = await mutate({
      mutation: gql`
        mutation {
          refreshToken(
            input: {
              token: "{\\"userId\\":\\"55e79d80-eb4f-11ea-a7bc-0a580ae98b08\\",\\"refreshToken\\":\\"invalid\\",\\"email\\":\\"nicky+signupmutation4@kraftful.com\\",\\"ksid\\":\\"ksid1\\"}"
            }
          ) {
            __typename
            ... on RefreshTokenSuccess {
              accessToken
              refreshToken
              ttl
            }
          }
        }
      `,
    });

    expect(refreshToken).toHaveBeenCalledTimes(1);
    expect(login).toHaveBeenCalledTimes(1);

    jest.clearAllMocks();

    expect(res).toMatchSnapshot();
  });
});
