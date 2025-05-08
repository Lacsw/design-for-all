import { createContext, useContext, useState } from 'react';

const InteractiveManagerContext = createContext();

export function InteractiveManagerProvider({ children }) {
  // activeComponent хранит id активного компонента
  const [activeComponent, setActiveComponent] = useState(null);
  // Добавляем состояние для хранения опций открытия
  const [componentOptions, setComponentOptions] = useState({});

  const openComponent = (id, options = {}) => {
    setActiveComponent(id);
    setComponentOptions(options);
  };

  const closeComponent = (id) => {
    if (activeComponent === id) {
      setActiveComponent(null);
      setComponentOptions({});
    }
  };

  return (
    <InteractiveManagerContext.Provider
      value={{ activeComponent, componentOptions, openComponent, closeComponent }}
    >
      {children}
    </InteractiveManagerContext.Provider>
  );
}

export const useInteractiveManager = () =>
  useContext(InteractiveManagerContext);
