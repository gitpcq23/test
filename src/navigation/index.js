import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {STACKS, MODULES} from './routes';
import HomeScreen from '../containers/Home';
import RoomScreen from '../containers/Rooms';

const Navigation = () => {
  const Stack = createStackNavigator();

  return (
    <>
      <NavigationContainer
        ref={nav => {
          navigator = nav;
        }}>
        <Stack.Navigator initialRouteName={MODULES.homeScreen.name}>
          <Stack.Screen
            name={MODULES.homeScreen.name}
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name={MODULES.roomScreen.name}
            component={RoomScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigation;
