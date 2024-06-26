import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <div className="profile-btn">
        <button onClick={openMenu} className="profile-btn-btn">
          <div>
            <i className="fa-solid fa-circle-user fa-xl" style={{color: "#b0b0b0"}}></i>
          </div>
          <div>
          <i class="fa-solid fa-bars fa-xl" style={{color: "#b0b0b0"}}></i>
          </div>
        </button>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="user-drop-down">
              <li>Hello, {user.firstName}</li>
            </div>
            <div className="user-drop-down">
              <li>{user.email}</li>
            </div>
            <div className="sign-in-main">
              <NavLink to='/spots/current'>Manage Spots</NavLink>
            </div>
            <div className="user-drop-down">
              <li className="">
                <button onClick={logout} className="user-drop-logout">Log Out</button>
              </li>
            </div>
          </>
        ) : (
          <>
            <div className="sign-in-main">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
            <div className="sign-in-main">
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
