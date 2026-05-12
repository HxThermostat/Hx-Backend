import React from "react";

import Provision from "~/utils/provisioning";

export const ProvisioningContext = React.createContext<Provision>(
  (null as unknown) as Provision
);
