import React, {useEffect, useRef} from "react";
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

import './Header.css';


const Header = ({ isAuthenticated, menuOpen, setMenuOpen}) => {

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, setMenuOpen]);

  return (
    <header>
      <Link className="header__logo" to='/'>
        <h1>Jessica's News Platform</h1>
      </Link>
      <div className="header__nav-wrapper">
        <Link className="header__nav-option" to="/my-bookmarks">My Bookmarks</Link>
        <div className="header__nav-option__wrapper">
          <button className="header__nav-option" onClick={() => setMenuOpen(!menuOpen)}>My Account</button>
          {!!menuOpen && (
            <div className="header__nav__secondary-options__wrapper" ref={wrapperRef}>
              {!!isAuthenticated ? (
                <>
                  <Link className="header__nav__profile" to='/profile' onClick={() => setMenuOpen(!menuOpen)}>Profile</Link>
                  <LogoutButton className="header__nav__logout" />
                </>
              ) : (
                <LoginButton className="header__nav__login"/>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
