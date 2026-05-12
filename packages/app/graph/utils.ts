import { AccessLevel, Mode } from "./schema";
import { UnreachableCaseError } from "ts-essentials";

export const hasAccess = (
  access: AccessLevel,
  required: AccessLevel
): boolean => {
  switch (required) {
    case "OWNER":
      return ["OWNER"].includes(access);
    case "INSTALLER":
      return ["OWNER", "INSTALLER"].includes(access);
    case "DIAGNOSTIC":
      return ["OWNER", "INSTALLER", "DIAGNOSTIC"].includes(access);
    case "STATUS":
      return true;
    default:
      throw new UnreachableCaseError(required);
  }
};

export const getSupportedModes = (
  supportedModes: Mode[]
): {
  heatingSupported: boolean;
  coolingSupported: boolean;
} => {
  const heatingSupported = supportedModes.some(mode => mode.includes("HEAT"));
  const coolingSupported = supportedModes.some(mode => mode.includes("COOL"));

  return {
    heatingSupported,
    coolingSupported,
  };
};
