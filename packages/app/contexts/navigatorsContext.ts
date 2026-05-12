import React from "react";

interface NavigatorsContextProps {
  isTablet: boolean;
}

export const NavigatorsContext = React.createContext<NavigatorsContextProps>({
  isTablet: false,
});
