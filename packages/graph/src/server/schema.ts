import { makeExecutableSchema } from "apollo-server-express";
import { merge } from "lodash";
import { GraphQLSchema } from "graphql";

import { typeResolvers, queryResolvers, mutationResolvers } from "../resolvers";

import loadSchema from "../schema";
import { Resolvers } from "../schema/resolvers-types";
import { AccessDirective } from "./directives";

const resolvers: Resolvers = {
  Query: merge({}, ...queryResolvers),
  Mutation: merge({}, ...mutationResolvers),
  ...merge({}, ...typeResolvers),
};

export default async function buildSchema(): Promise<GraphQLSchema> {
  const typeDefs = await loadSchema();

  return makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: {
      access: AccessDirective,
    },
    resolverValidationOptions: { requireResolversForResolveType: false },
  });
}
