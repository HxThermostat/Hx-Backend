import { DeviceSchemaValidator } from "../validators"
import { MOCK_DEVICE } from "../mockData";

test("validates empty object", () => {
  const validator = new DeviceSchemaValidator();

  const result = validator.validate({});

  expect(result.valid).toBe(false);

  if (result.valid) throw new Error("Invalid");

  expect(result.properties.length).toBeGreaterThan(1);
});

test("validates mock device", () => {
  const validator = new DeviceSchemaValidator();

  const result = validator.validate(MOCK_DEVICE);

  expect(result.valid).toBe(true);
});

test("validates dsn", () => {
  const validator = new DeviceSchemaValidator();

  const badPropsUndefined = {
    ...MOCK_DEVICE,
    dsn: undefined,
  };

  let result = validator.validate(badPropsUndefined);

  expect(result.valid).toBe(false);

  const badPropsNull = {
    ...MOCK_DEVICE,
    dsn: null,
  };

  result = validator.validate(badPropsNull);

  expect(result.valid).toBe(false);
});
