import { createContext, useContext, useState } from 'react';

const InteractiveManagerContext = createContext();

export function InteractiveManagerProvider({ children }) {
  // activeComponent хранит id активного компонента
  const [activeComponent, setActiveComponent] = useState(null);

  const openComponent = (id) => {
    setActiveComponent(id);
  };

  const closeComponent = (id) => {
    if (activeComponent === id) {
      setActiveComponent(null);
    }
  };

  return (
    <InteractiveManagerContext.Provider
      value={{ activeComponent, openComponent, closeComponent }}
    >
      {children}
    </InteractiveManagerContext.Provider>
  );
}

export const useInteractiveManager = () =>
  useContext(InteractiveManagerContext);
