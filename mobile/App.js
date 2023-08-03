import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PALETTE from './styles/PALETTE';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LogContextProvider } from './contexts/LogContext';
import { Image, View, Text, TextInput} from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query'
import KpassScreen1 from './screens/KpassScreen1';
import KpassScreen2 from './screens/KpassScreen2';
import KpassScreen3 from './screens/KpassScreen3';

//글자 크기 제한 통일
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.autoCorrect = false;
TextInput.defaultProps.allowFontScaling = false;

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

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
          headerTitleAlign: 'center',
          headerTitle : () => 
            <View style={{marginBottom : 10}}>
              <Image 
                source={require('./assets/oxpay-logo-white.png')} 
                resizeMode='contain'
                style={{
                  width : 60,
                  height : '100%',
                }}
              />
            </View>
        }}/>
      <Drawer.Screen 
        name="Kpass 카드란?" 
        component={KpassScreen1} 
        options={{drawerLabel : '1. K-pass 카드란?'}} />
      <Drawer.Screen 
        name="Kpass 카드 사용방법" 
        component={KpassScreen2} 
        options={{drawerLabel : '2. K-pass 카드 사용방법'}} />
      <Drawer.Screen 
        name="Kpass 카드 혜택" 
        component={KpassScreen3} 
        options={{drawerLabel : '3. K-pass 카드 혜택'}} />
    </Drawer.Navigator>
  )
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <LogContextProvider>
        <Stack.Navigator initialRouteName="RootDrawer">
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
    </QueryClientProvider>
  );
}
