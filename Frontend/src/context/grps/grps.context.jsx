import { createContext, useState } from "react";

export const GrpsContext = createContext({
  grps: null,
  setGrps: () => null,
});

export const GrpsProvider = ({ children }) => {
  const [grps, setGrps] = useState(null);
  const value = { grps, setGrps };

  return <GrpsContext.Provider value={value}>{children}</GrpsContext.Provider>;
};
