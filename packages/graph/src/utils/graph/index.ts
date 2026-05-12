import { Request } from "express";
import { execute, GraphQLSchema } from "graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

import buildSchema from "../../server/schema";
import context from "../../server/context";

let schema: GraphQLSchema;

export type Executor = <Result, Variables>(
  document: DocumentNode<Result, Variables>,
  variablesValues: Variables
) => Promise<Result>;

export async function buildLocalExecutor(
  req: Pick<Request, "headers">
): Promise<Executor> {
  if (schema === undefined) {
    schema = await buildSchema();
  }

  return async <Result, Variables>(
    document: DocumentNode<Result, Variables>,
    variableValues: Variables
  ): Promise<Result> => {
    const result = await execute({
      document,
      schema,
      variableValues,
      contextValue: context({ req }),
    });

    if (result.errors) {
      throw result.errors;
    }

    if (!result.data) {
      throw new Error("Unexpected empty <data>");
    }

    return result.data as Result;
  };
}
