import React from "react"
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import PALETTE from "../styles/PALETTE";

export function Loading() {
  return (
    <View style={styles.LoadingComponent}>
      <ActivityIndicator 
        size="large" 
        animating={true}
        style={{marginBottom : 5}}
      />
      <Text style={{color : PALETTE.GRAY}}>Loading Kpass...</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  LoadingComponent: {
    display : 'flex',
    flexDirection : 'column',
    justifyContent : 'center',
    alignItems : 'center',
    paddingTop : 200
  }
});
