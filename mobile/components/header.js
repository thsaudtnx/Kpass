import react from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import PALETTE from '../styles/PALETTE';

const Header = () => {
  return (
    <View style={{
      display : 'flex',
      flexDirection : 'row',
      alignItems : 'center',
      justifyContent : 'space-between',
      width : '100%',
      height : 60,
      padding : 15,
      backgroundColor : 'white',
      position : 'fixed',
      zIndex : 1,
      backgroundColor : PALETTE.LIGHT_PURPLE,
      //box-shadow
      }}>
      <Image 
        source={require('../assets/oxpayment-logo.png')} 
        resizeMode='contain'
        style={{
          width : 100,
          height : '100%',
        }}/>
        <Icon 
          name="menu" 
          size={35} 
          style={{color : PALETTE.WHITE,}}
          onPress={() => {}}
        />
    </View>
  );
};

export default Header;