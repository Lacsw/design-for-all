import { useState } from 'react';
import DropdownNavigation from './DropdownNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';
import { setTheme } from 'store/middlewares';


export default function MainMenu({ options = [], titleIcon }) {
  const dispatch = useDispatch();
  const theme = useSelector(getCurrentTheme);
  const [showName, setShowName] = useState(true);

  const toggleTheme = () => dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
  const toggleShowName = () => setShowName((prev) => !prev);

  const updatedOptions = options.map((option) => {
    if (option.name === 'Светлая тема') {
      return { 
        ...option, 
        name: theme === 'dark' ? 'Светлая тема' : 'Темная тема', 
        onClick: toggleTheme 
      };
    }
  
    if (option.name === 'Свернуть') {
      return { 
        ...option, 
        onClick: toggleShowName 
      };
    }
  
    return option;
  });

  return (
    <DropdownNavigation options={updatedOptions} titleIcon={titleIcon} title="Меню" showName={showName} />
  );
}
