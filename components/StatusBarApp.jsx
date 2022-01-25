import { useColorModeValue } from "native-base";
import { StatusBar } from "react-native";

const StatusBarApp = () => {
  return <StatusBar backgroundColor={useColorModeValue("#0E153A", "#22D1EE")} />;
};

export default StatusBarApp;
