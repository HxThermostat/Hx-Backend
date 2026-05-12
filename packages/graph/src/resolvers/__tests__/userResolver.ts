import { setupPolly } from "test-utils";

import { createTestClient } from "apollo-server-testing";
import { gql, ApolloServer } from "apollo-server-express";

import { Client } from "../../ayla";
import buildServer, { buildSchema, loaders } from "../../server";

setupPolly(__dirname);

describe("me", () => {
  test("it returns the correct fields when authenticated", async () => {
    const aylaClient = new Client("fd26e345c8904d23af766ec33feeafd6");
    const schema = await buildSchema();
    const user = {
      id: "4c1b068c-84cc-11ea-b979-0a580ae994a6",
      accessToken: "62d8d3cffcd142fa9424a2e7e3ea0579",
      email: "kraftfulho@gmail.com",
    };
    const server = buildServer(schema, {
      user,
      loaders: loaders(aylaClient, user),
      aylaClient,
    });

    const { query } = createTestClient(server);

    const res = query({
      query: gql`
        query {
          me {
            id
            accountType
            email
            temperatureUnit
          }
        }
      `,
    });

    return expect(res).resolves.toMatchSnapshot();
  });

  test("it returns null when unauthenticated", async () => {
    const aylaClient = new Client();
    const schema = await buildSchema();
    const server = buildServer(schema, {
      user: null,
      loaders: loaders(aylaClient, null),
      aylaClient,
    });

    const { query } = createTestClient(server);

    const res = query({
      query: gql`
        query {
          me {
            id
          }
        }
      `,
    });

    return expect(res).resolves.toMatchSnapshot();
  });
});

describe("changeTemperatureUnit", () => {
  let server: ApolloServer;
  const aylaClient = new Client("62d8d3cffcd142fa9424a2e7e3ea0579");

  beforeEach(async () => {
    const schema = await buildSchema();
    const user = {
      id: "4c1b068c-84cc-11ea-b979-0a580ae994a6",
      accessToken: "62d8d3cffcd142fa9424a2e7e3ea0579",
      email: "kraftfulho@gmail.com",
    };
    server = buildServer(schema, {
      user,
      loaders: loaders(aylaClient, user),
      aylaClient,
    });
  });

  test("it changes the unit", async () => {
    const { mutate } = createTestClient(server);

    const writeUserMetadataSpy = jest.spyOn(aylaClient, "writeUserMetadata");

    await expect(
      mutate({
        mutation: gql`
          mutation {
            changeTemperatureUnit(input: { temperatureUnit: F }) {
              ... on ChangeTemperatureUnitSuccess {
                user {
                  temperatureUnit
                }
              }
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();

    expect(writeUserMetadataSpy).toHaveBeenCalledWith("temperatureUnit", "F");
  });
});
