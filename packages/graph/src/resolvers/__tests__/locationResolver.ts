import { setupPolly } from "test-utils";

import { createTestClient } from "apollo-server-testing";
import { gql, ApolloServer } from "apollo-server-express";

import { Client } from "../../ayla";
import buildServer, { buildSchema, loaders } from "../../server";
import * as AylaUtils from "../../utils/ayla";

setupPolly(__dirname);

let server: ApolloServer;
const aylaClient = new Client("25e1b155062549f5b75e19e06b91c59d");
const batchDatapointsSpy = jest.spyOn(aylaClient, "batchDatapoints");

const writeBitSpy = jest.spyOn(AylaUtils, "writeBit");
const encodeVacationSpy = jest.spyOn(AylaUtils, "encodeVacation");

beforeEach(async () => {
  const schema = await buildSchema();
  const user = {
    id: "4c1b068c-84cc-11ea-b979-0a580ae994a6",
    accessToken: "d2897b33dcea48219c2b025608160b25",
    email: "kraftfulho@gmail.com",
  };
  server = buildServer(schema, {
    user,
    loaders: loaders(aylaClient, user),
    aylaClient,
  });
});

afterEach(() => {
  batchDatapointsSpy.mockClear();
  writeBitSpy.mockClear();
  encodeVacationSpy.mockClear();
});

describe("locations", () => {
  test("it returns the correct fields", () => {
    const { query } = createTestClient(server);

    const res = query({
      query: gql`
        query {
          locations {
            __typename
            id
            name
            dealer {
              name
            }
            connectionStatus
            lat
            lng
            override
            programmable
            modes
            vacation {
              active
              setpoints {
                heat
                cool
              }
            }
            faults {
              createdAt
              value
            }
            version {
              application
              bootloader
              outdoorControl
            }
            zones
            zoning
          }
        }
      `,
    });

    return expect(res).resolves.toMatchSnapshot();
  });
});

describe("location", () => {
  test("it returns the correct fields", () => {
    const { query } = createTestClient(server);

    const res = query({
      query: gql`
        query {
          location(id: "AC000W000426300") {
            __typename
            id
            name
            dealer {
              name
            }
            connectionStatus
            lat
            lng
            override
            modes
            programmable
            faults {
              createdAt
              value
            }
            version {
              application
              bootloader
              outdoorControl
            }
            zones
            zoning
          }
        }
      `,
    });

    return expect(res).resolves.toMatchSnapshot();
  });
});

describe("changeDealer", () => {
  test("it updates the dealer properties", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            changeDealer(
              input: {
                id: "AC000W000426300"
                email: "tom@hvacpro.com"
                name: "Tom Harris"
                phone: "510-123-4567"
                website: "https://hvacpro.com/"
              }
            ) {
              ... on ChangeDealerSuccess {
                location {
                  dealer {
                    email
                    name
                    phone
                    website
                  }
                }
              }
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();

    expect(batchDatapointsSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: "tom@hvacpro.com" }),
        dsn: "AC000W000426300",
        name: "dlrEmail",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: "Tom Harris" }),
        dsn: "AC000W000426300",
        name: "dlrName",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: "510-123-4567" }),
        dsn: "AC000W000426300",
        name: "dlrPhone",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: "https://hvacpro.com/" }),
        dsn: "AC000W000426300",
        name: "dlrWeb",
      })
    );
  });

  test("it treats missing parameters as a noop", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            changeDealer(input: { id: "AC000W000426300" }) {
              ... on ChangeDealerSuccess {
                location {
                  dealer {
                    email
                    name
                    phone
                    website
                  }
                }
              }
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();

    expect(batchDatapointsSpy).toHaveBeenCalledWith();
  });
});

describe("changeProgrammable", () => {
  test("it enables programmable mode", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            changeProgrammable(
              input: { id: "AC000W000426300", programmable: true }
            ) {
              ... on ChangeProgrammableSuccess {
                location {
                  programmable
                }
              }
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();

    expect(writeBitSpy).toHaveBeenCalledWith(expect.any(Number), 16, 0);

    expect(batchDatapointsSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W000426300",
        name: "SysStg",
      })
    );
  });

  test("it disables programmable mode", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            changeProgrammable(
              input: { id: "AC000W000426300", programmable: false }
            ) {
              ... on ChangeProgrammableSuccess {
                location {
                  programmable
                }
              }
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();

    expect(writeBitSpy).toHaveBeenCalledWith(expect.any(Number), 16, 1);

    expect(batchDatapointsSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W000426300",
        name: "SysStg",
      })
    );
  });
});

describe("changeVacation", () => {
  test("it enables vacation mode", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            changeVacation(input: { id: "AC000W005851005", active: true }) {
              ... on ChangeVacationSuccess {
                location {
                  vacation {
                    active
                    setpoints {
                      heat
                      cool
                    }
                  }
                }
              }
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();

    expect(encodeVacationSpy).toHaveBeenCalledWith(
      true,
      expect.any(Number),
      expect.any(Number)
    );

    expect(batchDatapointsSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W005851005",
        name: "Vacation",
      })
    );
  });

  test("it disables vacation mode", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            changeVacation(input: { id: "AC000W005851005", active: false }) {
              ... on ChangeVacationSuccess {
                location {
                  vacation {
                    active
                    setpoints {
                      heat
                      cool
                    }
                  }
                }
              }
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();

    expect(encodeVacationSpy).toHaveBeenCalledWith(
      false,
      expect.any(Number),
      expect.any(Number)
    );

    expect(batchDatapointsSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W005851005",
        name: "Vacation",
      })
    );
  });
});

describe("changeVacationSetpoints", () => {
  test("it changes the setpoints", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            changeVacationSetpoints(
              input: { id: "AC000W005851005", heat: 65, cool: 82 }
            ) {
              ... on ChangeVacationSetpointsSuccess {
                location {
                  vacation {
                    active
                    setpoints {
                      heat
                      cool
                    }
                  }
                }
              }
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();

    expect(encodeVacationSpy).toHaveBeenCalledWith(expect.any(Boolean), 65, 82);

    expect(batchDatapointsSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W005851005",
        name: "Vacation",
      })
    );
  });
});
