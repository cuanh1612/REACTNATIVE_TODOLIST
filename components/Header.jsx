import { Feather } from "@expo/vector-icons";
import { useColorMode, useColorModeValue, View } from "native-base";
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";

const Header = ({ onOpenDrawer }) => {
  //Setting color mode
  const { toggleColorMode } = useColorMode();

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          onOpenDrawer();
          Keyboard.dismiss();
        }}
      >
        <Feather
          name="menu"
          size={26}
          color={useColorModeValue("#0E153A", "#E2F3F5")}
        />
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={toggleColorMode}>
        <Feather
          name={useColorModeValue("moon", "sun")}
          size={24}
          color={useColorModeValue("#0E153A", "#E2F3F5")}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    height: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Header;
