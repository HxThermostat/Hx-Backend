import { buildLocalExecutor, Executor } from "../../../utils/graph";

export async function buildExecutor(): Promise<Executor> {
  return buildLocalExecutor({ headers: {} });
}
