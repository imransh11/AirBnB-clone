import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation"
import Spots from "./components/Spots/Spots";
import SpotDetails from "./components/Spots/spotdetail";
import { CreateNewSpot } from "./store/spots";
import CreateSpot from "./components/CreateSpotForm";
import UsersSpots from "./components/ManageSpots/ManageYourSpots";
import Updated from "./components/UpdateSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        <Route path='/' exact>
          <Spots />
        </Route>
        <Route path='/spots/new'>
          <CreateSpot />
        </Route>
        <Route path='/spots/current'>
          <UsersSpots />
        </Route>
        <Route path='/spots/:spotId/edit'>
          <Updated />
        </Route>
        <Route path='/spots/:spotId'>
          <SpotDetails />
        </Route>
        </Switch>}
    </>
  );
}

export default App;
