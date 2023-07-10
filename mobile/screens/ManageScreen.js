import React from "react";
import PALETTE from "../styles/PALETTE";
import {WebView} from 'react-native-webview';
import { View } from "react-native";

const server = 'http://192.168.0.126:3000';

export default function ManageScreen() {

  return (
    <View style={{backgroundColor : PALETTE.BACKGROUND, width : '100%', height : 800}}>
       <WebView
          source={{
            uri: server,
          }}
          style={{width : '100%', height : 800}}
        />
    </View>
  );
};