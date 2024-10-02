import { useThemes } from '../contexts/ThemeContext';
import Button from './Button';
import Icon from './Icon';
import styles from './MenuPanel.module.css';
import { FaCog, FaPlus } from 'react-icons/fa';
import { IoHome } from 'react-icons/io5';
import { BiSolidPhotoAlbum } from 'react-icons/bi';
import { NavLink, useHref } from 'react-router-dom';

function MenuPanel() {
  const { isDark } = useThemes();
  const navigation = useHref();

  return (
    <div className={`${styles.menuPanel} ${isDark && styles.themeDark}`}>
      {navigation !== '/' && (
        <NavLink to="/">
          <Button secondary rounded>
            <Icon>
              <IoHome />
            </Icon>
          </Button>
        </NavLink>
      )}
      {navigation !== '/myposts' && (
        <NavLink to="/myposts">
          <Button secondary rounded>
            <Icon>
              <BiSolidPhotoAlbum />
            </Icon>
          </Button>
        </NavLink>
      )}
      {navigation !== '/newpost' && (
        <NavLink to="/newpost">
          <Button secondary rounded>
            <Icon>
              <FaPlus />
            </Icon>
          </Button>
        </NavLink>
      )}
      {navigation !== '/settings' && (
        <NavLink to="/settings">
          <Button secondary rounded>
            <Icon>
              <FaCog />
            </Icon>
          </Button>
        </NavLink>
      )}
    </div>
  );
}

export default MenuPanel;
