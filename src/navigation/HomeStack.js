import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MODULES, STACKS} from './routes';
import Register from '../containers/Register';
import Listing from '../containers/Listing';
import {headerStyle, headerTitleStyle} from '../constants';

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={MODULES.registerScreen.name}
        component={Register}
        options={{
          headerTitle: 'Register',
          headerTitleAlign: 'center',
          headerShown: true,
          headerStyle,
          headerTitleStyle,
        }}
      />

      <Stack.Screen
        name={MODULES.listingScreen.name}
        component={Listing}
        options={{
          headerTitle: 'Register',
          headerTitleAlign: 'center',
          headerShown: true,
          headerStyle,
          headerTitleStyle,
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
