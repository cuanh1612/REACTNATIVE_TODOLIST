import { NativeBaseProvider, useColorModeValue, View } from "native-base";
import { StyleSheet } from "react-native";
import Header from "../Header";
import { DrawerActions } from "@react-navigation/native";

export default function MainLayout({ children, navigation }) {
  const darkLightMode = useColorModeValue("white", "#0E153A");

  //Handle open drawer
  const onOpenDrawer = () => {
      navigation.dispatch(DrawerActions.openDrawer())
  }
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: darkLightMode,
      }}
    >
      <Header onOpenDrawer = {onOpenDrawer} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 20,
  },
});
