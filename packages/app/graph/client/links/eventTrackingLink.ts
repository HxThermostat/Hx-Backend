import { ApolloLink } from "@apollo/client";
import { trackSegmentEvent } from "~/utils/segment";

const eventTrackingLink = new ApolloLink((operation, forward) => {
  const { operationName, query } = operation;

  const queryHasMutation = query.definitions.some(
    // this node exists, and exists in the d.ts as an OperationDefinitionNode but TS complains every which way at the moment (maybe cuz we're still on an beta apollo?)
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    (def: OperationDefinitionNode) => def?.operation === "mutation"
  );

  return forward(operation).map(data => {
    // If the query had mutations within it, track it
    if (queryHasMutation) {
      let typename = "";
      const { data: resultData } = data;
      // we can't easily detect what the __typename is, but we can loop through the response data object and find it.
      for (const key in resultData) {
        if (resultData[key] && resultData[key]?.__typename) {
          typename = resultData[key]?.__typename;
        }
      }
      trackSegmentEvent(`GQL: ${operationName}`, {
        operationName,
        __typename: typename,
      });
      return data;
    }
    return data;
  });
});

export default eventTrackingLink;
