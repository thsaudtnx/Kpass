import React from "react";
import PALETTE from "../styles/PALETTE";
import {WebView} from 'react-native-webview';
import { View } from "react-native";


export default function TravelWalletScreen() {

  return (
    <View style={{backgroundColor : PALETTE.BACKGROUND, width : '100%', height : 800}}>
       <WebView
          source={{
            uri: 'https://www.travel-wallet.com/',
          }}
          style={{width : '100%', height : 800}}
        />
    </View>
  );
};