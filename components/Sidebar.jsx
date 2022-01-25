import { Feather } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { useColorModeValue, VStack } from "native-base";
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Sidebar = (props) => {
  //Handle open drawer
  const onCloseDrawer = () => {
    props.navigation.dispatch(DrawerActions.closeDrawer());
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{
        height: "100%"
    }} style={styles.container}>
      <View style={styles.headerDrawer}>
        <TouchableWithoutFeedback onPress={onCloseDrawer}>
          <AntDesign name="close" size={24} color="#0E153A" />
        </TouchableWithoutFeedback>
      </View>

      <DrawerItemList {...props} />
      <View style={styles.illustration}>
        <Image
          style={styles.image}
          source={require("../assets/Illustration.png")}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  headerDrawer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    paddingTop: 20,
    marginBottom: 20,
  },

  illustration: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },

  image: {
    width: "50%",
    height: 150,
  },


});

export default Sidebar;
