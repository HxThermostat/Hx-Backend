import { Headers } from "actions-on-google";

import { buildLocalExecutor, Executor } from "../../../utils/graph";

export type { Executor } from "../../../utils/graph";

export async function buildExecutor(headers: Headers): Promise<Executor> {
  return buildLocalExecutor({ headers });
}
