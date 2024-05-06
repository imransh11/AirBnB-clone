import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  // console.log(sessionUser, 'test session user')

  return (

    <>
    <div className='navigation-container'>
      <div className='airbnb-logo' >
        <div className='logo'>
          <NavLink exact to="/" style={{color: 'red'}}><i class="fa-brands fa-airbnb fa-2xl"></i> airbnb</NavLink>
        </div>
      </div>

      {sessionUser ?
      <div className='airbnb-your-home'>
        <NavLink to='/spots/new'>Airbnb your home</NavLink>
      </div> : <div></div>
      }

      {isLoaded && (
        <div className=''>
          <ProfileButton user={sessionUser} />
        </div>
        )}
    </div>
    </>

  );
}

export default Navigation;
