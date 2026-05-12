import { DeviceSchema, DevicePropertiesSchema } from "./schema";

export type ValidationSuccessResult = {
  valid: true;
}

export type ValidationErrorResult = {
  valid: false;
  properties: string[]
}

export type ValidationResult = ValidationSuccessResult | ValidationErrorResult;

export class DeviceSchemaValidator {
  validate(obj: unknown): ValidationResult {
    if (obj == null) return {valid: false, properties: ["<empty>"]};
    
    const parseResult = DeviceSchema.safeParse(obj);

    if (parseResult.success){
      return {valid: true};
    }

    return {
      valid: false,
      properties: parseResult.error.issues.map((issue) => issue.path.join(".")),
    };
  }

  static validateDevice(obj: unknown): ValidationResult {
    const validator = new DeviceSchemaValidator();

    return validator.validate(obj);
  }
}

export class DevicePropertiesSchemaValidator {
  validate(obj: unknown): ValidationResult {
    if (obj == null) return {valid: false, properties: ["<empty>"]};
    
    const parseResult = DevicePropertiesSchema.safeParse(obj);

    if (parseResult.success){
      return {valid: true};
    }

    return {
      valid: false,
      properties: parseResult.error.issues.map((issue) => issue.path.join(".")),
    };
  }

  static validateProperties(obj: unknown): ValidationResult {
    const validator = new DevicePropertiesSchemaValidator();

    return validator.validate(obj);
  }
}
