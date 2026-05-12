import { GenericPayload } from "../index";

export const create = jest.fn((payload: GenericPayload) => {
  return JSON.stringify(payload);
});

export const decode = jest.fn(
  (payload: string) => JSON.parse(payload) as GenericPayload
);
