import { setupPolly } from "test-utils";

import { createTestClient } from "apollo-server-testing";
import { gql, ApolloServer } from "apollo-server-express";

import { Client } from "../../ayla";
import buildServer, { buildSchema, loaders } from "../../server";

setupPolly(__dirname);

let server: ApolloServer;
const aylaClient = new Client("c7af971cc8fc49d5b1e1fde8d3b64e94");
const createShareSpy = jest.spyOn(aylaClient, "createShare");
const deleteShareSpy = jest.spyOn(aylaClient, "deleteShare");

beforeEach(async () => {
  const schema = await buildSchema();
  const user = {
    id: "4c1b068c-84cc-11ea-b979-0a580ae994a6",
    accessToken: "e97e0281292c47ebb94d4e10ea3e201f",
    email: "nickykraftful.com",
  };
  server = buildServer(schema, {
    user,
    loaders: loaders(aylaClient, user),
    aylaClient,
  });
});

afterEach(() => {
  createShareSpy.mockClear();
  deleteShareSpy.mockClear();
});

describe("shares", () => {
  test("it returns the correct fields", () => {
    const { query } = createTestClient(server);

    const res = query({
      query: gql`
        query {
          locations {
            id
            name
            shares {
              id
              accessLevel
              expiresAt
            }
          }
        }
      `,
    });

    return expect(res).resolves.toMatchSnapshot();
  });
});

describe("shareLocation", () => {
  test("it shares a location", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            shareLocation(
              input: {
                id: "AC000W000426300"
                email: "kraftfulpro@gmail.com"
                accessLevel: INSTALLER
              }
            ) {
              __typename
              ... on ShareLocationSuccess {
                location {
                  shares {
                    id
                    expiresAt
                    accessLevel
                  }
                }
              }
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();

    expect(createShareSpy).toHaveBeenCalledWith(
      "AC000W000426300",
      "OEM::jci::Installer",
      "kraftfulpro@gmail.com",
      undefined
    );
  });

  test("it fails with an invalid email", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            shareLocation(
              input: {
                id: "AC000W000426300"
                email: "invalid@kraftful.com"
                accessLevel: INSTALLER
              }
            ) {
              __typename
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();
  });

  test("it fails with an invalid expiresAt", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            shareLocation(
              input: {
                id: "AC000W000426300"
                email: "kraftfulpro@gmail.com"
                accessLevel: INSTALLER
                expiresAt: "Invalid"
              }
            ) {
              __typename
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();
  });

  test("it overwrites an existing share", async () => {
    jest.setTimeout(15000);
    const { mutate } = createTestClient(server);

    await mutate({
      mutation: gql`
        mutation {
          shareLocation(
            input: {
              id: "AC000W000426300"
              email: "kraftfulpro@gmail.com"
              accessLevel: INSTALLER
            }
          ) {
            __typename
            ... on ShareLocationSuccess {
              location {
                shares {
                  id
                  expiresAt
                  accessLevel
                }
              }
            }
          }
        }
      `,
    });

    await expect(
      mutate({
        mutation: gql`
          mutation {
            shareLocation(
              input: {
                id: "AC000W000426300"
                email: "kraftfulpro@gmail.com"
                accessLevel: STATUS
              }
            ) {
              __typename
              ... on ShareLocationSuccess {
                location {
                  shares {
                    id
                    expiresAt
                    accessLevel
                  }
                }
              }
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();

    expect(deleteShareSpy).toHaveBeenCalled();

    expect(createShareSpy).toHaveBeenCalledWith(
      "AC000W000426300",
      "OEM::jci::Service",
      "kraftfulpro@gmail.com",
      undefined
    );
  });
});

describe("revokeShare", () => {
  test("it revokes a share", async () => {
    const { mutate } = createTestClient(server);

    const r = await mutate({
      mutation: gql`
        mutation {
          shareLocation(
            input: {
              id: "AC000W000426300"
              email: "kraftfulpro@gmail.com"
              accessLevel: INSTALLER
            }
          ) {
            __typename
            ... on ShareLocationSuccess {
              location {
                shares {
                  id
                  expiresAt
                  accessLevel
                }
              }
            }
          }
        }
      `,
    });

    const id = r.data?.shareLocation.location.shares[0].id;

    await expect(
      mutate({
        mutation: gql`
          mutation RevokeShare($input: RevokeShareInput!) {
            revokeShare(input: $input) {
              __typename
            }
          }
        `,
        variables: {
          input: {
            id,
          },
        },
      })
    ).resolves.toMatchSnapshot();

    expect(deleteShareSpy).toHaveBeenCalledWith(id);
  });
});
