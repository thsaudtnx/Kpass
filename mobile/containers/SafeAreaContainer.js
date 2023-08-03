import { StyleSheet, Platform, StatusBar, SafeAreaView } from "react-native";
import PALETTE from "../styles/PALETTE";

export function SafeAreaContainer({children}) {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    backgroundColor: PALETTE.PURPLE,
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  }
});

