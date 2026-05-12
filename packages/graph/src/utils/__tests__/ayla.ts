import {
  aylaId,
  zoneNum,
  setTmpOvr,
  decodeAway,
  encodeAway,
  writeBit,
  readBit,
  decodeTmpOvr,
  decodeFanStg,
  availableModes,
  generatePassword,
  generateKsid,
  encodeFanStg,
  decodeSchStpts,
  normalizeVSControlStatusItems,
  normalizeStatusItems,
} from "../ayla";
import { FanMode, Mode } from "../../schema/resolvers-types";

describe("aylaId", () => {
  test("matches a non-zoning id", () => {
    expect(aylaId("N123")).toBe("123");
  });
  test("matches a zoning id", () => {
    expect(aylaId("Z123-0")).toBe("123");
  });
});

describe("zoneNum", () => {
  test("extracts the zone number", () => {
    expect(zoneNum("Z123-0")).toBe(0);
    expect(zoneNum("Z123-8")).toBe(8);
  });
});

describe("setTmpOvr", () => {
  test("encodes values", () => {
    expect(setTmpOvr(50, 90)).toBe(12890);
    expect(setTmpOvr(88, 90)).toBe(22618);
    expect(setTmpOvr(62, 78)).toBe(15950);
  });
});

describe("decodeTmpOvr", () => {
  test("it decodes values", () => {
    expect(decodeTmpOvr(12890)).toEqual([50, 90]);
    expect(decodeTmpOvr(22618)).toEqual([88, 90]);
    expect(decodeTmpOvr(15950)).toEqual([62, 78]);
  });
});

describe("decodeAway", () => {
  test("decodes when the status is set to away", () => {
    expect(decodeAway("AWAY;62,76")).toEqual([true, 62, 76]);
  });
  test("decodes when the status is set to home", () => {
    expect(decodeAway("HOME;62,76")).toEqual([false, 62, 76]);
  });
});

describe("encodeAway", () => {
  test("encodes away", () => {
    expect(encodeAway(true, 62, 76)).toBe("AWAY;62,76");
  });
  test("encodes home", () => {
    expect(encodeAway(false, 62, 76)).toBe("HOME;62,76");
  });
});

describe("writeBit", () => {
  test("it writes specific bits", () => {
    expect(writeBit(0, 0, 1)).toEqual(1);
    expect(writeBit(0, 1, 1)).toEqual(2);
    expect(writeBit(1, 1, 1)).toEqual(3);
  });
});

describe("readBit", () => {
  test("it reads specific bits", () => {
    expect(readBit(0, 0)).toBe(0);
    expect(readBit(1, 0)).toBe(1);
    expect(readBit(2, 0)).toBe(0);
    expect(readBit(2, 1)).toBe(1);
  });
});

describe("decodeFanStg", () => {
  test("it decodes AUTO", () => {
    expect(decodeFanStg(17)).toEqual(expect.arrayContaining([FanMode.Auto, 0]));
  });

  test("it decodes 15 min/hr", () => {
    expect(decodeFanStg(18)).toEqual(
      expect.arrayContaining([FanMode.Fifteen, 0])
    );
  });

  test("it decodes 30 min/hr", () => {
    expect(decodeFanStg(34)).toEqual(
      expect.arrayContaining([FanMode.Thirty, 0])
    );
  });

  test("it decodes 45 min/hr", () => {
    expect(decodeFanStg(66)).toEqual(
      expect.arrayContaining([FanMode.Fortyfive])
    );
  });

  test("it decodes always", () => {
    expect(decodeFanStg(130)).toEqual(expect.arrayContaining([FanMode.Always]));
  });
});

describe("encodeFanStg", () => {
  test("it encodes AUTO", () => {
    expect(encodeFanStg(FanMode.Auto)).toEqual(17);
  });

  test("it encodes 15 min/hr", () => {
    expect(encodeFanStg(FanMode.Fifteen)).toEqual(18);
  });

  test("it encodes 30 min/hr", () => {
    expect(encodeFanStg(FanMode.Thirty)).toEqual(34);
  });

  test("it encodes 45 min/hr", () => {
    expect(encodeFanStg(FanMode.Fortyfive)).toEqual(66);
  });

  test("it encodes always", () => {
    expect(encodeFanStg(FanMode.Always)).toEqual(130);
  });
});

describe("availableModes", () => {
  test("it extracts the available modes", () => {
    expect(availableModes(535070)).toEqual(
      expect.arrayContaining([
        Mode.Auto,
        Mode.Heat,
        Mode.Maxheat,
        Mode.Cool,
        Mode.Maxcool,
        Mode.Eheat,
        Mode.Off,
      ])
    );
  });
});

describe("generatePassword", () => {
  test("it generates a consistent password based on the input string", () => {
    const email = "test@example.com";
    const ksid = "1234";

    expect(generatePassword(email)).toEqual(generatePassword(email));

    expect(generatePassword(email, ksid)).toEqual(
      generatePassword(email, ksid)
    );
  });

  test("it generates a different passwords for different inputs", () => {
    expect(generatePassword("test@example.com")).not.toEqual(
      generatePassword("test2@example.com")
    );
  });

  test("the generated password is 8 characters long", () => {
    expect(generatePassword("test@example.com").length).toEqual(8);
  });
});

describe("generateKsid", () => {
  test("it generates random strings with each call", () => {
    expect(generateKsid()).not.toEqual(generateKsid());
  });

  test("it generates a 64 byte string", () => {
    expect(generateKsid().length).toEqual(64);
  });
});

describe("decodeSchStpts", () => {
  test("it decodes the setpoints", () => {
    const [fanMode, heat, cool] = decodeSchStpts(8535634);

    expect(fanMode).toEqual(FanMode.Always);
    expect(heat).toEqual(62);
    expect(cool).toEqual(82);
  });
});

describe("normalizeVSControlStatusItems", () => {
  const statusOD6ValWithoutComma =
    "VS CONTROL OD UNIT SIZE: 5.0 TERMINATE TEMP: 80 DEMAND RESPONSE: OFF COMF/EFF: EFF LOCKOUTS: HP: 30  AUX: 30 CLIMATE: HUMID AIRFLOW ADJ: COOL: 0% HEAT: 10%";
  const statusOD6ValWithComma =
    "VS CONTROL OD UNIT SIZE: 5.0 TERMINATE TEMP: 80 DEMAND RESPONSE: OFF COMF/EFF: EFF LOCKOUTS: HP: 30, AUX: 30 CLIMATE: HUMID AIRFLOW ADJ: COOL: 0% HEAT: 10%";

  // Simple pairs
  // OD UNIT SIZE: 5.0
  // TERMINATE TEMP: 80
  // DEMAND RESPONSE: OFF
  // COMF/EFF: EFF
  // CLIMATE: HUMID

  // Weird pairs
  // LOCKOUTS: HP: 30  AUX: 30
  // AIRFLOW ADJ: COOL: 0% HEAT: 10%

  test("it parses pairs correctly without comma", () => {
    const result = normalizeVSControlStatusItems(statusOD6ValWithoutComma);

    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain("OD UNIT SIZE: 5.0");
    expect(result).toContain("TERMINATE TEMP: 80");
    expect(result).toContain("DEMAND RESPONSE: OFF");
    expect(result).toContain("COMF/EFF: EFF");
    expect(result).toContain("CLIMATE: HUMID");
    expect(result).toContain("LOCKOUTS: HP: 30  AUX: 30");
    expect(result).toContain("AIRFLOW ADJ: COOL: 0% HEAT: 10%");
  });

  test("it parses pairs correctly with comma", () => {
    const result = normalizeVSControlStatusItems(statusOD6ValWithComma);

    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain("OD UNIT SIZE: 5.0");
    expect(result).toContain("TERMINATE TEMP: 80");
    expect(result).toContain("DEMAND RESPONSE: OFF");
    expect(result).toContain("COMF/EFF: EFF");
    expect(result).toContain("CLIMATE: HUMID");
    expect(result).toContain("LOCKOUTS: HP: 30, AUX: 30");
    expect(result).toContain("AIRFLOW ADJ: COOL: 0% HEAT: 10%");
  });
});

describe("normalizeStatusItems", () => {
  const unformattedVSControl =
    "VS CONTROL OD UNIT SIZE: 5.0 TERMINATE TEMP: 80 DEMAND RESPONSE: OFF COMF/EFF: EFF LOCKOUTS: HP: 30  AUX: 30 CLIMATE: HUMID AIRFLOW ADJ: COOL: 0% HEAT: 10%";

  test("it parses VS CONTROL status items", () => {
    const result = normalizeStatusItems(unformattedVSControl);

    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain("OD UNIT SIZE: 5.0");
    expect(result).toContain("TERMINATE TEMP: 80");
    expect(result).toContain("DEMAND RESPONSE: OFF");
    expect(result).toContain("COMF/EFF: EFF");
    expect(result).toContain("CLIMATE: HUMID");
    expect(result).toContain("LOCKOUTS: HP: 30  AUX: 30");
    expect(result).toContain("AIRFLOW ADJ: COOL: 0% HEAT: 10%");
  });
});
