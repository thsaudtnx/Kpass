import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import AboutScreen from './screens/AboutScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PALETTE from './styles/PALETTE';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TravelWalletScreen from './screens/TravelWalletScreen';
import { useState } from 'react';
import { useEffect } from 'react';
import { LogContextProvider } from './contexts/LogContext';
import ManageScreen from './screens/ManageScreen';
import SplashScreen from './screens/SplashScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function RootDrawer(){
  return (
    <Drawer.Navigator 
      initialRouteName="Home"
      drawerPosition="left"
      backBehavior="history">
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{drawerLabel : 'HOME'}}/>
      <Drawer.Screen 
        name="About" 
        component={AboutScreen} 
        options={{drawerLabel : 'ABOUT'}} />
      <Drawer.Screen 
        name="TravelWallet" 
        component={TravelWalletScreen} 
        options={{drawerLabel : 'TRAVELWALLET'}} />
      <Drawer.Screen 
        name="Manage" 
        component={ManageScreen} 
        options={{drawerLabel : 'MANAGE'}} />
    </Drawer.Navigator>
  )
};

export default function App() {
  return (
    <NavigationContainer>
      <LogContextProvider>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RootDrawer"
            component={RootDrawer}
            options={{ 
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen 
            name="Detail" 
            component={DetailScreen} 
            options={route => ({
              title : route.params,
              headerStyle : {
                backgroundColor : PALETTE.PURPLE
              },
              headerTintColor : PALETTE.WHITE,
              headerTitleAlign : 'center',
              headerTitleStyle : {
                fontWeight : 'bold',
                fontSize : 20,
                color : PALETTE.WHITE,
              }
            })}/>
        </Stack.Navigator>
      </LogContextProvider>
    </NavigationContainer>
    
  );
}
