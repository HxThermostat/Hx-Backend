import { DevicePropertiesSchemaValidator } from "../validators"
import { MOCK_DEVICE_PROPERTIES } from "../mockData";

test("validates empty object", () => {
  const validator = new DevicePropertiesSchemaValidator();

  const result = validator.validate({});

  expect(result.valid).toBe(false);

  if (result.valid) throw new Error("Invalid");

  expect(result.properties.length).toBeGreaterThan(1);
});

test("validates mock properties", () => {
  const validator = new DevicePropertiesSchemaValidator();

  const result = validator.validate(MOCK_DEVICE_PROPERTIES);

  expect(result.valid).toBe(true);
});

test("validates SysStg", () => {
  const validator = new DevicePropertiesSchemaValidator();

  const badPropsUndefined = {
    ...MOCK_DEVICE_PROPERTIES,
    SysStg: undefined,
  };

  let result = validator.validate(badPropsUndefined);

  expect(result.valid).toBe(false);

  const badPropsNull = {
    ...MOCK_DEVICE_PROPERTIES,
    SysStg: null,
  };

  result = validator.validate(badPropsNull);

  expect(result.valid).toBe(false);
});

test("validates SetpointRange.max", () => {
  const validator = new DevicePropertiesSchemaValidator();

  const badPropsCoolSetpoint = {
    ...MOCK_DEVICE_PROPERTIES,
    ClStptMax: null,
  };

  let result = validator.validate(badPropsCoolSetpoint);

  expect(result.valid).toBe(false);

  const badPropsHeatSetpoint = {
    ...MOCK_DEVICE_PROPERTIES,
    HtStptMax: null,
  };

  result = validator.validate(badPropsHeatSetpoint);

  expect(result.valid).toBe(false);
});
