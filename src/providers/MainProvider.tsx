import React, { createContext, ReactNode, useState } from "react";

// Declare the context and its variable names with types
interface MainContextProps {
  count: number;
  increment: () => void;
}

// Create variable to hold the initial values
const initialMainContextValues: MainContextProps = {
  count: 0,
  increment: () => {},
};

const MainContext = createContext<MainContextProps>(initialMainContextValues);

interface MainProviderProps {
  children: ReactNode;
}

const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
  const [count, setCount] = useState(20);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // Define and Export the provider state variables here
  const contextValues = {
    count,
    increment,
  };

  return (
    <MainContext.Provider value={contextValues}>
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
