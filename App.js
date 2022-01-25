import "react-native-gesture-handler";
import { NativeBaseProvider, useColorModeValue } from "native-base";
import MainLayout from "./components/layouts/MainLayout";
import ListTasks from "./components/Pages/Tasks";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Contact from "./components/Pages/Contact";
import Sidebar from "./components/Sidebar";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { LogBox } from "react-native";
import StatusBarApp from "./components/StatusBarApp";

//Create drawer
const Drawer = createDrawerNavigator();

export default function App() {

  //Clear logbox
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  ]);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <Sidebar {...props} />}
          screenOptions={{
            headerShown: false,
            drawerLabelStyle: {
              marginLeft: -10,
            },
          }}
          initialRouteName="Tasks"
        >
          <Drawer.Screen
            options={{
              drawerIcon: ({ color, size }) => {
                return <FontAwesome5 name="tasks" size={size} color={color} />;
              },
            }}
            name="Tasks"
            children={({ route, navigation }) => {
              return (
                <MainLayout route={route} navigation={navigation}>
                  <ListTasks />
                </MainLayout>
              );
            }}
          />

          <Drawer.Screen
            name="Contact"
            options={{
              drawerIcon: ({ color, size }) => {
                return <AntDesign name="contacts" size={size} color={color} />;
              },
            }}
            children={({ route, navigation }) => {
              return (
                <MainLayout route={route} navigation={navigation}>
                  <Contact />
                </MainLayout>
              );
            }}
          />
        </Drawer.Navigator>
        <StatusBarApp/>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
