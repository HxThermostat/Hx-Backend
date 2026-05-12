import type { Express } from "express";

export interface MiddlewareOptions {
  app: Express;
  path?: string;
}
