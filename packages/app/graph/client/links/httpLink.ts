import { createHttpLink } from "@apollo/client";

import { GRAPH_URL } from "~/constants";

const httpLink = createHttpLink({
  uri: GRAPH_URL
});

export default httpLink;
