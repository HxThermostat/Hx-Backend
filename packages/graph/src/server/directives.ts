// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SchemaDirectiveVisitor } from "apollo-server-express";
import {
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLField,
  defaultFieldResolver,
} from "graphql";
import { AccessLevel } from "../schema/resolvers-types";

// Make TS aware of the additional properties we need to thread
// through the visitor
declare module "graphql" {
  interface GraphQLObjectType {
    _requiredAccessLevel: AccessLevel | null;
    _authFieldsWrapped?: boolean;
  }
  interface GraphQLInterfaceType {
    _requiredAccessLevel: AccessLevel | null;
    _authFieldsWrapped?: boolean;
  }
  interface GraphQLField<TSource, TContext, TArgs = { [key: string]: any }> {
    _requiredAccessLevel: AccessLevel | null;
  }
}

// It's important that the Enum be defined in such a way that the
// access levels go from high to low
const ACCESS_LEVELS = Object.values(AccessLevel);

export class AccessDirective extends SchemaDirectiveVisitor {
  visitObject(type: GraphQLObjectType): void {
    this.ensureFieldsWrapped(type);
    type._requiredAccessLevel = this.args.requires;
  }
  // Visitor methods for nested types like fields and arguments also
  // receive a details object that provides information about the
  // parent and grandparent types.
  visitFieldDefinition(
    field: GraphQLField<any, any> & {
      _requiredAccessLevel: AccessLevel | null;
    },
    details: {
      objectType: GraphQLObjectType | GraphQLInterfaceType;
    }
  ): void {
    this.ensureFieldsWrapped(details.objectType);
    field._requiredAccessLevel = this.args.requires;
  }

  ensureFieldsWrapped(
    objectType: GraphQLObjectType | GraphQLInterfaceType
  ): void {
    // Mark the GraphQLObjectType object to avoid re-wrapping:
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;

      field.resolve = function(...args) {
        // Get the required Role from the field first, falling back
        // to the objectType if no Role is required by the field:
        const requiredAccessLevel =
          field._requiredAccessLevel || objectType._requiredAccessLevel;

        // If there is no (valid) directive, move forward with the resolver
        const requiredAccessLevelIndex = ACCESS_LEVELS.indexOf(
          requiredAccessLevel as AccessLevel
        );
        if (requiredAccessLevelIndex === -1) {
          return resolve.apply(this, args);
        }

        // Try to find the `accessLevel` field on the field in question
        const parent = args[0];
        const accessLevel = parent && parent.accessLevel;

        // If we can't find an `accessLevel`, we're choosing to
        // default to `null`. Essentially, we're saying the semantics
        // of the directive are "if the field can't fulfil this
        // required access level, nullify it".
        //
        // It would be nice to be able to inherit an `accessLevel`
        // from higher up the tree, not sure how to do that though and
        // there aren't any fields (currently) where that would be
        // helpful.
        const accessLevelIndex = ACCESS_LEVELS.indexOf(accessLevel);
        if (accessLevelIndex === -1) return null;

        // And finally, make sure the current access level has a
        // sufficiently-high priority comparied to the required access
        // levle
        if (accessLevelIndex <= requiredAccessLevelIndex) {
          return resolve.apply(this, args);
        } else {
          return null;
        }
      };
    });
  }
}
