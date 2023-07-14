import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import AboutScreen from './screens/AboutScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PALETTE from './styles/PALETTE';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LogContextProvider } from './contexts/LogContext';
import SplashScreen from './screens/SplashScreen';
import { Image, View } from 'react-native';

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
        options={{
          drawerLabel : 'HOME',
          headerTitleAlign: 'left',
          headerTitle : () => 
            <View style={{marginBottom : 10}}>
              <Image 
                source={require('./assets/oxpay-logo-white.png')} 
                resizeMode='contain'
                style={{
                  width : 80,
                  height : '100%',
                  color : PALETTE.WHITE,
                }}
              />
            </View>
        }}/>
      <Drawer.Screen 
        name="About" 
        component={AboutScreen} 
        options={{drawerLabel : 'ABOUT'}} />
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
