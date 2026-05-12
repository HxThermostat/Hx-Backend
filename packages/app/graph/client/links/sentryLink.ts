import { ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { addBreadcrumb, Severity } from "@sentry/react-native";

const queryLogger = new ApolloLink((operation, forward) => {
  const { operationName, query } = operation;
  const definition = query.definitions[0];

  const breadcrumb = {
    type: "query",
    level: Severity.Info,
    data: {
      name: operationName,
      kind:
        definition.kind === "OperationDefinition"
          ? definition.operation
          : "Unknown",
    },
  };

  addBreadcrumb({ ...breadcrumb, category: "started" });

  return forward(operation).map(data => {
    addBreadcrumb({ ...breadcrumb, category: "finished" });

    return data;
  });
});

const errorLogger = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      addBreadcrumb({
        type: "query",
        level: Severity.Error,
        category: "GraphQL Error",
        data: {
          message,
          location: `${locations}`,
          path,
        },
      })
    );

  if (networkError) {
    addBreadcrumb({
      type: "query",
      level: Severity.Error,
      category: "Network Error",
    });
  }
});

const sentryLink = errorLogger.concat(queryLogger);

export default sentryLink;
