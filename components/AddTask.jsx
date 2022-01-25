import { FontAwesome5 } from "@expo/vector-icons";
import { useColorModeValue } from "native-base";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';

const AddTask = ({
  isShowAddTask,
  setIsShowAddTask,
  setAllTasks,
}) => {
  //Set initial value tasks
  useEffect(async () => {
    const tasks = await AsyncStorage.getItem("tasks");
    if (tasks) {
      const tasksParse = JSON.parse(tasks);
      setAllTasks(tasksParse);
    }
  }, []);

  //State value add task
  const [titleTask, setTitleTask] = useState("");

  //Set animated show component add task
  const fadeAddTask = useRef(new Animated.Value(0), []).current;

  //Set animated margin add task
  const fadeMarginAddTask = useRef(new Animated.Value(0), []).current;

  //Set animated margin add task
  const fadeBorderAddTask = useRef(new Animated.Value(0), []).current;

  //Handle animate show add task
  const fadeShowAddTask = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAddTask, {
          toValue: 50,
          duration: 300,
          useNativeDriver: false,
        }),

        Animated.timing(fadeMarginAddTask, {
          toValue: 25,
          duration: 300,
          useNativeDriver: false,
        }),

        Animated.timing(fadeBorderAddTask, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]),

      Animated.timing(fadeMarginAddTask, {
        toValue: 20,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  //Handle animate close add task
  const fadeCloseAddTask = () => {
    Animated.parallel([
      Animated.timing(fadeAddTask, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),

      Animated.timing(fadeMarginAddTask, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),

      Animated.timing(fadeBorderAddTask, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  //Ref input add new task
  const refInputAdd = useRef(null);

  //Handle focus input
  const forcusInput = () => {
    refInputAdd.current.focus();
  };

  //Handle animate close / open add task
  useEffect(() => {
    if (isShowAddTask) {
      fadeShowAddTask();
      forcusInput();
    } else {
      setTitleTask("");
      Keyboard.dismiss();
      fadeCloseAddTask();
    }
  }, [isShowAddTask]);

  //Handle add data to storage
  const onSubmitTask = async () => {
    Keyboard.dismiss();

    let newAllTasks = [];
    await AsyncStorage.getItem("tasks").then((data) => {
      if (data) {
        const oldTasks = JSON.parse(data);
        newAllTasks = [
          ...oldTasks,
          {
            title: titleTask,
            checked: false,
            id: uuid.v4()
          },
        ];
      }
    });

    setAllTasks(newAllTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(newAllTasks));
    setIsShowAddTask(false);
  };

  return (
    <TouchableWithoutFeedback onPress={forcusInput}>
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <Animated.View
          shadow={8}
          style={{
            ...styles.newTask,
            display: "flex",
            flexDirection: "row",
            height: fadeAddTask,
            marginTop: fadeMarginAddTask,
            borderWidth: fadeBorderAddTask,
          }}
        >
          <TextInput
            onSubmitEditing={() => {
              onSubmitTask();
            }}
            value={titleTask}
            onChangeText={(e) => {
              setTitleTask(e);
            }}
            ref={refInputAdd}
            style={styles.inputAdd}
          />
          <TouchableWithoutFeedback
            onPress={() => {
              onSubmitTask();
            }}
          >
            <FontAwesome5
              name="check"
              size={24}
              color={useColorModeValue("#0E153A", "#22D1EE")}
            />
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  newTask: {
    width: "100%",
    backgroundColor: "#E2F3F5",
    shadowColor: "#000",
    borderRadius: 4,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#22D1EE",
    marginBottom: 20,
  },

  inputAdd: {
    flex: 1,
    height: 35,
  },
});

export default AddTask;
