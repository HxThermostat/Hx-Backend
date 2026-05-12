import { setupPolly } from "test-utils";

import { createTestClient } from "apollo-server-testing";
import { gql, ApolloServer } from "apollo-server-express";

import { Client } from "../../ayla";
import buildServer, { buildSchema, loaders } from "../../server";
import * as AylaUtils from "../../utils/ayla";
import { advanceTo } from "jest-date-mock";

setupPolly(__dirname);

let server: ApolloServer;
const aylaClient = new Client("01d5b17855c84905ad3e920a6a4081c5");
const batchDatapointsSpy = jest.spyOn(aylaClient, "batchDatapoints");

const writeBitSpy = jest.spyOn(AylaUtils, "writeBit");
const setTmpOvrSpy = jest.spyOn(AylaUtils, "setTmpOvr");

afterEach(() => {
  batchDatapointsSpy.mockClear();
  writeBitSpy.mockClear();
  setTmpOvrSpy.mockClear();
});

beforeEach(async () => {
  const schema = await buildSchema();
  const user = {
    id: "4c1b068c-84cc-11ea-b979-0a580ae994a6",
    accessToken: "83301c945e504a39b236f6975fccbeb3",
    email: "kraftfulho@gmail.com",
  };
  server = buildServer(schema, {
    user,
    loaders: loaders(aylaClient, user),
    aylaClient,
  });
});

describe("zoning controllers", () => {
  test("it returns the correct fields", () => {
    const { query } = createTestClient(server);

    // We need to fix the current time because `activeScheduleEvent`
    // is based on the time the query was exectued
    advanceTo(new Date("2020-08-25T18:30:00.000Z"));

    const res = query({
      query: gql`
        query {
          location(id: "AC000W001132899") {
            controllers {
              id
              name
              setpoints {
                heat
                cool
              }
              mode
              modes
              away {
                active
                setpoints {
                  heat
                  cool
                }
              }
              humidity
              indoorTemp
              outdoorTemp
              fan {
                cfm
                mode
                modes
                override
              }
              deadband
              coolRange {
                min
                max
              }
              heatRange {
                min
                max
              }
              tempOverride
              schedule {
                day
                awake {
                  day
                  fanMode
                  setpoints {
                    heat
                    cool
                  }
                  slot
                  start {
                    day
                    hour
                    minute
                  }
                  stop {
                    day
                    hour
                    minute
                  }
                }
                leave {
                  day
                  fanMode
                  setpoints {
                    heat
                    cool
                  }
                  slot
                  start {
                    day
                    hour
                    minute
                  }
                  stop {
                    day
                    hour
                    minute
                  }
                }
                arrive {
                  day
                  fanMode
                  setpoints {
                    heat
                    cool
                  }
                  slot
                  start {
                    day
                    hour
                    minute
                  }
                  stop {
                    day
                    hour
                    minute
                  }
                }
                bed {
                  day
                  fanMode
                  setpoints {
                    heat
                    cool
                  }
                  slot
                  start {
                    day
                    hour
                    minute
                  }
                  stop {
                    day
                    hour
                    minute
                  }
                }
                events {
                  day
                  fanMode
                  setpoints {
                    heat
                    cool
                  }
                  slot
                  start {
                    day
                    hour
                    minute
                  }
                  stop {
                    day
                    hour
                    minute
                  }
                }
              }

              activeScheduleEvent {
                day
                fanMode
                setpoints {
                  heat
                  cool
                }
                slot
                start {
                  day
                  hour
                  minute
                }
                stop {
                  day
                  hour
                  minute
                }
              }

              zone

              dehumidification {
                mode
                max
                min
                value
              }
              humidification {
                mode
                max
                min
                value
              }
              scheduleOverride

              zoneSensor {
                sensor
                version
              }
            }
          }
        }
      `,
    });

    return expect(res).resolves.toMatchSnapshot();
  });

  test("it changes setpoints", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            changeSetpoint(
              input: { id: "ZAC000W001132899-1", setpoint: HEAT, value: 68 }
            ) {
              ... on ChangeSetpointSuccess {
                controller {
                  setpoints {
                    heat
                  }
                }
              }
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();

    expect(writeBitSpy).toHaveBeenCalledWith(expect.any(Number), 1, 1);
    expect(setTmpOvrSpy).toHaveBeenCalledWith(68, expect.any(Number));

    // This is more brittle than I'd like because it checks the argument order,
    // if this ends up breaking because of that it's probably worth
    // (1) investigating if we can make this assertion more flexible
    // (2) adjusting the call signature to accept an array instead of varargs
    expect(batchDatapointsSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W001132899",
        name: "TmpOvrSt",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W001132899",
        name: "TmpOvr2",
      })
    );
  });

  test("it changes modes", async () => {
    const { mutate } = createTestClient(server);

    // Change to a known mode
    await mutate({
      mutation: gql`
        mutation {
          changeMode(input: { id: "ZAC000W001132899-1", mode: COOL }) {
            ... on ChangeModeSuccess {
              controller {
                mode
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
            changeMode(input: { id: "ZAC000W001132899-1", mode: OFF }) {
              ... on ChangeModeSuccess {
                controller {
                  mode
                }
              }
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();

    // This is more brittle than I'd like because it checks the argument order,
    // if this ends up breaking because of that it's probably worth
    // (1) investigating if we can make this assertion more flexible
    // (2) adjusting the call signature to accept an array instead of varargs
    expect(batchDatapointsSpy).lastCalledWith(
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: 1 }),
        dsn: "AC000W001132899",
        name: "TmpOvrSt",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: 2 }),
        dsn: "AC000W001132899",
        name: "UsrMd2Prev",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: 0 }),
        dsn: "AC000W001132899",
        name: "UsrMd2",
      })
    );
  });

  test("it changes away", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            changeAway(input: { id: "ZAC000W001132899-1", active: true }) {
              ... on ChangeAwaySuccess {
                controller {
                  away {
                    active
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
        datapoint: expect.objectContaining({
          value: expect.stringContaining("AWAY"),
        }),
        dsn: "AC000W001132899",
        name: "AwayZn2",
      })
    );
  });

  test("it cancels a temperature hold", async () => {
    const { mutate } = createTestClient(server);

    // Trigger the temperature hold
    await mutate({
      mutation: gql`
        mutation {
          changeSetpoint(
            input: { id: "ZAC000W001132899-1", setpoint: HEAT, value: 88 }
          ) {
            __typename
          }
        }
      `,
    });

    await expect(
      mutate({
        mutation: gql`
          mutation {
            cancelTemperatureHold(input: { id: "ZAC000W001132899-1" }) {
              ... on CancelTemperatureHoldSuccess {
                controller {
                  setpoints {
                    heat
                    cool
                  }
                  tempOverride
                }
              }
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();

    expect(writeBitSpy).toHaveBeenCalledWith(expect.any(Number), 1, 0);

    expect(batchDatapointsSpy).lastCalledWith(
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W001132899",
        name: "TmpOvrSt",
      })
    );
  });

  test("it cancels a fan hold", async () => {
    const { mutate } = createTestClient(server);

    // Trigger the fan hold
    await mutate({
      mutation: gql`
        mutation {
          changeFanMode(input: { id: "ZAC000W001132899-1", mode: ALWAYS }) {
            __typename
          }
        }
      `,
    });

    await expect(
      mutate({
        mutation: gql`
          mutation {
            cancelFanHold(input: { id: "ZAC000W001132899-1" }) {
              ... on CancelFanHoldSuccess {
                controller {
                  fan {
                    mode
                    override
                  }
                }
              }
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();

    expect(writeBitSpy).toHaveBeenCalledWith(expect.any(Number), 1, 0);

    expect(batchDatapointsSpy).lastCalledWith(
      expect.objectContaining({
        datapoint: expect.objectContaining({
          value: expect.any(Number),
        }),
        dsn: "AC000W001132899",
        name: "FanStg2",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W001132899",
        name: "FanOvrSt",
      })
    );
  });

  test.skip("it changes the schedule", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            changeSchedule(
              input: {
                id: "ZAC000W001132899-1"
                day: SUN
                slot: AWAKE
                heat: 68
                cool: 78
                fanMode: AUTO
                hour: 8
                minute: 0
              }
            ) {
              ... on ChangeScheduleSuccess {
                controller {
                  schedule {
                    day
                    awake {
                      fanMode
                      setpoints {
                        heat
                        cool
                      }
                      start {
                        hour
                        minute
                      }
                    }
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
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W001132899",
        name: "Sch2p1",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W001132899",
        name: "Sch2p2",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W001132899",
        name: "SchFan2",
      })
    );
  });

  test.skip("it copies the schedule", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            copySchedule(
              input: {
                id: "ZAC000W001132899-1"
                source: SUN
                destination: [MON, TUE]
              }
            ) {
              ... on CopyScheduleSuccess {
                controller {
                  schedule {
                    day
                    awake {
                      fanMode
                      setpoints {
                        heat
                        cool
                      }
                      start {
                        hour
                        minute
                      }
                    }
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
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W001132899",
        name: "Sch2p1",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W001132899",
        name: "Sch2p2",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W001132899",
        name: "SchFan2",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W001132899",
        name: "SchDayPartsZn2",
      })
    );
  });

  test.skip("it adds and removes the leave/arrive events", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            addLeaveArrive(
              input: {
                id: "ZAC000W001132899-1"
                day: SUN
                leaveHeat: 58
                leaveCool: 82
                leaveFanMode: AUTO
                leaveHour: 10
                leaveMinute: 0
                arriveHeat: 66
                arriveCool: 78
                arriveFanMode: ALWAYS
                arriveHour: 17
                arriveMinute: 0
              }
            ) {
              ... on AddLeaveArriveSuccess {
                controller {
                  schedule {
                    day
                    events {
                      fanMode
                      setpoints {
                        heat
                        cool
                      }
                      start {
                        hour
                        minute
                      }
                    }
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
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W001132899",
        name: "SchDayPartsZn2",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W001132899",
        name: "Sch2p1",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W001132899",
        name: "Sch2p2",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W001132899",
        name: "SchFan2",
      })
    );

    await expect(
      mutate({
        mutation: gql`
          mutation {
            removeLeaveArrive(input: { id: "ZAC000W001132899-1", day: SUN }) {
              ... on RemoveLeaveArriveSuccess {
                controller {
                  schedule {
                    day
                    events {
                      fanMode
                      setpoints {
                        heat
                        cool
                      }
                      start {
                        hour
                        minute
                      }
                    }
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
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W001132899",
        name: "SchDayPartsZn2",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W001132899",
        name: "Sch2p1",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W001132899",
        name: "Sch2p2",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W001132899",
        name: "SchFan2",
      })
    );
  });
});

describe("non-zoning controllers", () => {
  test("it returns the correct fields", () => {
    const { query } = createTestClient(server);

    // We need to fix the current time because `activeScheduleEvent`
    // is based on the time the query was exectued
    advanceTo(new Date("2020-08-25T18:30:00.000Z"));

    const res = query({
      query: gql`
        query {
          location(id: "AC000W000426300") {
            controller {
              id
            }
            controllers {
              id
              name
              setpoints {
                heat
                cool
              }
              mode
              modes
              away {
                active
                setpoints {
                  heat
                  cool
                }
              }
              humidity
              indoorTemp
              outdoorTemp
              fan {
                cfm
                mode
                modes
                override
              }
              deadband
              coolRange {
                min
                max
              }
              heatRange {
                min
                max
              }
              tempOverride
              schedule {
                day
                awake {
                  day
                  fanMode
                  setpoints {
                    heat
                    cool
                  }
                  slot
                  start {
                    day
                    hour
                    minute
                  }
                  stop {
                    day
                    hour
                    minute
                  }
                }
                leave {
                  day
                  fanMode
                  setpoints {
                    heat
                    cool
                  }
                  slot
                  start {
                    day
                    hour
                    minute
                  }
                  stop {
                    day
                    hour
                    minute
                  }
                }
                arrive {
                  day
                  fanMode
                  setpoints {
                    heat
                    cool
                  }
                  slot
                  start {
                    day
                    hour
                    minute
                  }
                  stop {
                    day
                    hour
                    minute
                  }
                }
                bed {
                  day
                  fanMode
                  setpoints {
                    heat
                    cool
                  }
                  slot
                  start {
                    day
                    hour
                    minute
                  }
                  stop {
                    day
                    hour
                    minute
                  }
                }
                events {
                  day
                  fanMode
                  setpoints {
                    heat
                    cool
                  }
                  slot
                  start {
                    day
                    hour
                    minute
                  }
                  stop {
                    day
                    hour
                    minute
                  }
                }
              }

              activeScheduleEvent {
                day
                fanMode
                setpoints {
                  heat
                  cool
                }
                slot
                start {
                  day
                  hour
                  minute
                }
                stop {
                  day
                  hour
                  minute
                }
              }

              dehumidification {
                mode
                max
                min
                value
              }

              humidification {
                mode
                max
                min
                value
              }
              scheduleOverride
            }
          }
        }
      `,
    });

    return expect(res).resolves.toMatchSnapshot();
  });
  test("it changes setpoints", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            changeSetpoint(
              input: { id: "NAC000W000426300", setpoint: HEAT, value: 68 }
            ) {
              ... on ChangeSetpointSuccess {
                controller {
                  setpoints {
                    heat
                  }
                }
              }
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();

    expect(writeBitSpy).toHaveBeenCalledWith(expect.any(Number), 0, 1);
    expect(setTmpOvrSpy).toHaveBeenCalledWith(68, expect.any(Number));

    // This is more brittle than I'd like because it checks the argument order,
    // if this ends up breaking because of that it's probably worth
    // (1) investigating if we can make this assertion more flexible
    // (2) adjusting the call signature to accept an array instead of varargs
    expect(batchDatapointsSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W000426300",
        name: "TmpOvrSt",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W000426300",
        name: "TmpOvr1",
      })
    );
  });

  test("it changes modes", async () => {
    const { mutate } = createTestClient(server);

    // Change to a known mode
    await mutate({
      mutation: gql`
        mutation {
          changeMode(input: { id: "NAC000W000426300", mode: COOL }) {
            ... on ChangeModeSuccess {
              controller {
                mode
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
            changeMode(input: { id: "NAC000W000426300", mode: OFF }) {
              ... on ChangeModeSuccess {
                controller {
                  mode
                }
              }
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();

    // This is more brittle than I'd like because it checks the argument order,
    // if this ends up breaking because of that it's probably worth
    // (1) investigating if we can make this assertion more flexible
    // (2) adjusting the call signature to accept an array instead of varargs
    expect(batchDatapointsSpy).lastCalledWith(
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: 0 }),
        dsn: "AC000W000426300",
        name: "TmpOvrSt",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: 2 }),
        dsn: "AC000W000426300",
        name: "UsrMd1Prev",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: 0 }),
        dsn: "AC000W000426300",
        name: "UsrMd1",
      })
    );
  });

  test("it changes away", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            changeAway(input: { id: "NAC000W000426300", active: true }) {
              ... on ChangeAwaySuccess {
                controller {
                  away {
                    active
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
        datapoint: expect.objectContaining({
          value: expect.stringContaining("AWAY"),
        }),
        dsn: "AC000W000426300",
        name: "Away",
      })
    );
  });

  test("it cancels a temperature hold", async () => {
    const { mutate } = createTestClient(server);

    // Trigger the temperature hold
    await mutate({
      mutation: gql`
        mutation {
          changeSetpoint(
            input: { id: "NAC000W000426300", setpoint: HEAT, value: 88 }
          ) {
            __typename
          }
        }
      `,
    });

    await expect(
      mutate({
        mutation: gql`
          mutation {
            cancelTemperatureHold(input: { id: "NAC000W000426300" }) {
              ... on CancelTemperatureHoldSuccess {
                controller {
                  setpoints {
                    heat
                    cool
                  }
                  tempOverride
                }
              }
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();

    expect(batchDatapointsSpy).lastCalledWith(
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: 0 }),
        dsn: "AC000W000426300",
        name: "TmpOvrSt",
      })
    );
  });

  test("it cancels a fan hold", async () => {
    const { mutate } = createTestClient(server);

    // Trigger the fan hold
    await mutate({
      mutation: gql`
        mutation {
          changeFanMode(input: { id: "NAC000W000426300", mode: ALWAYS }) {
            __typename
          }
        }
      `,
    });

    await expect(
      mutate({
        mutation: gql`
          mutation {
            cancelFanHold(input: { id: "NAC000W000426300" }) {
              ... on CancelFanHoldSuccess {
                controller {
                  fan {
                    mode
                    override
                  }
                }
              }
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();

    expect(batchDatapointsSpy).lastCalledWith(
      expect.objectContaining({
        datapoint: expect.objectContaining({
          value: expect.any(Number),
        }),
        dsn: "AC000W000426300",
        name: "FanStg1",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: 0 }),
        dsn: "AC000W000426300",
        name: "FanOvrSt",
      })
    );
  });

  test("it changes the schedule", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            changeSchedule(
              input: {
                id: "NAC000W000426300"
                day: SUN
                slot: AWAKE
                heat: 68
                cool: 78
                fanMode: AUTO
                hour: 8
                minute: 0
              }
            ) {
              ... on ChangeScheduleSuccess {
                controller {
                  schedule {
                    day
                    awake {
                      fanMode
                      setpoints {
                        heat
                        cool
                      }
                      start {
                        hour
                        minute
                      }
                    }
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
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W000426300",
        name: "Sch1D1Cl",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W000426300",
        name: "Sch1D1Ht",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W000426300",
        name: "Sch1D1Tm1",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W000426300",
        name: "Sch1D1Tm2",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W000426300",
        name: "SchFan",
      })
    );
  });

  test("it copies the schedule", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            copySchedule(
              input: {
                id: "NAC000W000426300"
                source: SUN
                destination: [MON, TUE]
              }
            ) {
              ... on CopyScheduleSuccess {
                controller {
                  schedule {
                    day
                    awake {
                      fanMode
                      setpoints {
                        heat
                        cool
                      }
                      start {
                        hour
                        minute
                      }
                    }
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
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W000426300",
        name: "Sch1D2Cl",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W000426300",
        name: "Sch1D2Ht",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W000426300",
        name: "Sch1D2Tm1",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W000426300",
        name: "Sch1D2Tm2",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W000426300",
        name: "Sch1D3Cl",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W000426300",
        name: "Sch1D3Ht",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W000426300",
        name: "Sch1D3Tm1",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W000426300",
        name: "Sch1D3Tm2",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W000426300",
        name: "SchFan",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W000426300",
        name: "SchDayParts",
      })
    );
  });

  test("it adds and removes the leave/arrive events", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            addLeaveArrive(
              input: {
                id: "NAC000W000426300"
                day: SUN
                leaveHeat: 58
                leaveCool: 82
                leaveFanMode: AUTO
                leaveHour: 10
                leaveMinute: 0
                arriveHeat: 66
                arriveCool: 78
                arriveFanMode: ALWAYS
                arriveHour: 17
                arriveMinute: 0
              }
            ) {
              ... on AddLeaveArriveSuccess {
                controller {
                  schedule {
                    day
                    events {
                      fanMode
                      setpoints {
                        heat
                        cool
                      }
                      start {
                        hour
                        minute
                      }
                    }
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
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W000426300",
        name: "SchDayParts",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W000426300",
        name: "Sch1D1Cl",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W000426300",
        name: "Sch1D1Ht",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W000426300",
        name: "Sch1D1Tm1",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W000426300",
        name: "Sch1D1Tm2",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W000426300",
        name: "SchFan",
      })
    );

    await expect(
      mutate({
        mutation: gql`
          mutation {
            removeLeaveArrive(input: { id: "NAC000W000426300", day: SUN }) {
              ... on RemoveLeaveArriveSuccess {
                controller {
                  schedule {
                    day
                    events {
                      fanMode
                      setpoints {
                        heat
                        cool
                      }
                      start {
                        hour
                        minute
                      }
                    }
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
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W000426300",
        name: "SchDayParts",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W000426300",
        name: "Sch1D1Cl",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W000426300",
        name: "Sch1D1Ht",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W000426300",
        name: "Sch1D1Tm1",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(Number) }),
        dsn: "AC000W000426300",
        name: "Sch1D1Tm2",
      }),
      expect.objectContaining({
        datapoint: expect.objectContaining({ value: expect.any(String) }),
        dsn: "AC000W000426300",
        name: "SchFan",
      })
    );
  });
});

describe("changeDehumidificationMode", () => {
  test("it sets the mode", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            changeDehumidificationMode(
              input: { id: "ZAC000W001132899-0", mode: AUTO }
            ) {
              ... on ChangeHumidificationModeSuccess {
                controller {
                  dehumidification {
                    mode
                  }
                }
              }
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();

    expect(batchDatapointsSpy).lastCalledWith(
      expect.objectContaining({
        datapoint: expect.objectContaining({
          value: expect.any(Number),
        }),
        dsn: "AC000W001132899",
        name: "DHStg1",
      })
    );
  });

  test("it fails with a NotSupported status for unsupported systems", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            changeDehumidificationMode(
              input: { id: "NAC000W000426300", mode: AUTO }
            ) {
              __typename
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();
  });
});

describe("changeHumidificationMode", () => {
  test("it sets the mode", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            changeHumidificationMode(
              input: { id: "ZAC000W001132899-0", mode: AUTO }
            ) {
              ... on ChangeHumidificationModeSuccess {
                controller {
                  humidification {
                    mode
                  }
                }
              }
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();

    expect(batchDatapointsSpy).lastCalledWith(
      expect.objectContaining({
        datapoint: expect.objectContaining({
          value: expect.any(Number),
        }),
        dsn: "AC000W001132899",
        name: "HumStg1",
      })
    );
  });

  test("it fails with a NotSupported status for unsupported systems", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            changeHumidificationMode(
              input: { id: "NAC000W000426300", mode: AUTO }
            ) {
              __typename
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();
  });
});

describe("changeDehumidification", () => {
  test("it sets the value", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            changeDehumidification(
              input: { id: "ZAC000W001132899-0", value: 0.5 }
            ) {
              ... on ChangeHumidificationSuccess {
                controller {
                  dehumidification {
                    mode
                    value
                  }
                }
              }
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();

    expect(batchDatapointsSpy).lastCalledWith(
      expect.objectContaining({
        datapoint: expect.objectContaining({
          value: expect.any(Number),
        }),
        dsn: "AC000W001132899",
        name: "DHStg1",
      })
    );
  });

  test("it fails with a NotSupported status for unsupported systems", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            changeDehumidification(
              input: { id: "NAC000W000426300", value: 0.5 }
            ) {
              __typename
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();
  });
});

describe("changeHumidification", () => {
  test("it sets the humidification value", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            changeHumidification(
              input: { id: "ZAC000W001132899-0", value: 0.35 }
            ) {
              ... on ChangeHumidificationSuccess {
                controller {
                  humidification {
                    mode
                    value
                  }
                }
              }
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();

    expect(batchDatapointsSpy).lastCalledWith(
      expect.objectContaining({
        datapoint: expect.objectContaining({
          value: expect.any(Number),
        }),
        dsn: "AC000W001132899",
        name: "HumStg1",
      })
    );
  });

  test("it fails with a NotSupported status for unsupported systems", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            changeHumidification(
              input: { id: "NAC000W000426300", value: 0.35 }
            ) {
              __typename
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();
  });
});

describe("changeScheduleOverride", () => {
  test("changes the override", async () => {
    const { mutate } = createTestClient(server);

    await expect(
      mutate({
        mutation: gql`
          mutation {
            changeScheduleOverride(
              input: { id: "ZAC000W001132899-0", scheduleOverride: NEXT_EVENT }
            ) {
              ... on ChangeScheduleOverrideSuccess {
                controller {
                  scheduleOverride
                }
              }
            }
          }
        `,
      })
    ).resolves.toMatchSnapshot();

    expect(batchDatapointsSpy).lastCalledWith(
      expect.objectContaining({
        datapoint: expect.objectContaining({
          value: "Next Event",
        }),
        dsn: "AC000W001132899",
        name: "OverrideStg",
      })
    );
  });
});
