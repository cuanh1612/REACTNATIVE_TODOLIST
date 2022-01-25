import { Ionicons, MaterialCommunityIcons  } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VStack } from "native-base";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
} from "react-native";
import { useEffect } from "react/cjs/react.development";
import AddTask from "../AddTask";
import Task from "../Task";

const ListTasks = () => {
  //State tasks
  const [allTasks, setAllTasks] = useState([]);

  //Set initial all tasks from storage
  useEffect(async () => {
    await AsyncStorage.getItem("tasks").then((data) => {
      if (data) {
        const parseAllTasksLocal = JSON.parse(data);
        setAllTasks(parseAllTasksLocal);
      }
    });
  }, []);

  //State show task
  const [isShowAddTask, setIsShowAddTask] = useState(false);

  //On change is show button add
  const onChangeShowAddTask = () => {
    setIsShowAddTask(!isShowAddTask);
  };

  //Handle checked change and save storage
  const UpdateCheckedTasks = async (idChange, checkedChange) => {
    let newAllTasks = [];
    await AsyncStorage.getItem("tasks").then((data) => {
      if (data) {
        const parseAllTasksLocal = JSON.parse(data);
        newAllTasks = parseAllTasksLocal.map((itemTask, indexTask) => {
          if (itemTask.id == idChange) {
            return {
              ...itemTask,
              checked: checkedChange,
            };
          }
          return itemTask;
        });
      }
    });
    await AsyncStorage.setItem("tasks", JSON.stringify(newAllTasks));
  };

  return (
    <View style={styles.container}>
      <VStack>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AddTask
            isShowAddTask={isShowAddTask}
            setAllTasks={setAllTasks}
            setIsShowAddTask={setIsShowAddTask}
          />
          {allTasks.map((task, index) => (
            <Task
              id={task.id}
              title={task.title}
              checkedTask={task.checked}
              key={task.id}
              UpdateCheckedTasks={UpdateCheckedTasks}
              setAllTasks={setAllTasks}
            />
          ))}
        </ScrollView>
      </VStack>

      <TouchableHighlight
        onPress={onChangeShowAddTask}
        underlayColor="#DDDDDD"
        style={styles.buttonAdd}
      >
        <View>
          {isShowAddTask ? (
            <MaterialCommunityIcons name="cancel" size={24} color="white" />
          ) : (
            <Ionicons name="add-sharp" size={24} color="white" />
          )}
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

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

  buttonAdd: {
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#22D1EE",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default ListTasks;
