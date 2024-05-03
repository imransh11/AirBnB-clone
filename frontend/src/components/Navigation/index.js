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
      <div className='' >
        <NavLink exact to="/" style={{color: 'red'}}><i class="fa-brands fa-airbnb"></i></NavLink>
      </div>

      {sessionUser ?
      <div className=''>
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
