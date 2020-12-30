import React, {useState, useContext, useEffect} from 'react';
import {Text, Button} from 'react-native';
import Navigation from './navigation';
import {Context} from './contexts';

let intialsRooms = [];

export default function AppWrapper() {
  // creating a local state
  const [state, setState] = useState(intialsRooms);

  return (
    <Context.Provider value={{state, setState}}>
      <Navigation />
    </Context.Provider>
  );
}
