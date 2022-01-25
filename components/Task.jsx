import {
  StyleSheet,
  Animated,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import { Box, Text, Checkbox, HStack, useColorModeValue } from "native-base";
import { useEffect, useRef, useState } from "react";
import Svg, { Path, Rect } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from '@expo/vector-icons'; 

const Task = ({ UpdateCheckedTasks, title, checkedTask, id, setAllTasks }) => {
  //get width
  const withScreen = Dimensions.get("screen").width;

  //Setting animated line through task
  const fadeLineThrough = useRef(new Animated.Value(0)).current;

  //Setting animated checkbox
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const fadePathCheckbox = useRef(new Animated.Value(30)).current;

  //Setting animated margin task
  const fadeMarginTask = useRef(new Animated.Value(25)).current;

  //Handle animate fade checked task
  const fadeCheckedTask = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeLineThrough, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),

        Animated.timing(fadePathCheckbox, {
          toValue: 60,
          duration: 300,
          useNativeDriver: false,
        }),

        Animated.timing(fadeMarginTask, {
          toValue: 30,
          duration: 200,
          useNativeDriver: false,
        }),
      ]),

      Animated.timing(fadeMarginTask, {
        toValue: 25,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  //Handle animate fade cacel checked task
  const fadeCancelCheckedTask = () => {
    Animated.parallel([
      Animated.timing(fadeLineThrough, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),

      Animated.timing(fadePathCheckbox, {
        toValue: 30,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  //Set initial animated when checked
  useEffect(() => {
    if (checked) {
      fadeCheckedTask();
    }
  }, []);

  //State checked
  const [checked, setChecked] = useState(checkedTask);

  //Handle user change status check animate
  const handleChangeCheckBox = () => {
    if (!checked) {
      fadeCheckedTask();
    } else {
      fadeCancelCheckedTask();
    }
    UpdateCheckedTasks(id, !checked);
    setChecked(!checked);
  };

  //Create animatedScrollView
  const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
  const animatedHeightScroll = useRef(new Animated.Value(50), []).current;
  const animatedMarginContainer = useRef(new Animated.Value(20), []).current;

  //Handle animate delete task
  const animateDeleteTask = () => {
    Animated.parallel([
      Animated.timing(animatedHeightScroll, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }),

      Animated.timing(animatedMarginContainer, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      })
    ]).start()
  }

  //Handle delete task
  let deleteTimeOut = null;
  const onDeleteTask = async () => {
    clearTimeout(deleteTimeOut);
    deleteTimeOut = setTimeout(async () => {
      animateDeleteTask()
      let newArrayTask = [];
      await AsyncStorage.getItem("tasks").then(async (data) => {
        if (data) {
          newArrayTask = JSON.parse(data).filter((itemTask, indexTask) => {
            return itemTask.id !== id && itemTask;
          });
        }
      })
      await AsyncStorage.setItem("tasks", JSON.stringify(newArrayTask));
      // setAllTasks(newArrayTask);
    }, 50);
  };

  return (
    <Animated.View
      style={{
        ...styles.container,
        marginBottom: animatedMarginContainer,
      }}
    >
      <AnimatedScrollView
        style={{
          height: animatedHeightScroll
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        disableIntervalMomentum={true}
        snapToOffsets={[withScreen - 40, withScreen / 2]}
        onMomentumScrollEnd={({ nativeEvent }) => {
          const checkToEnd =
            nativeEvent.layoutMeasurement.width + nativeEvent.contentOffset.x;
          if (nativeEvent.contentSize.width - checkToEnd < 20) {
            onDeleteTask();
          }
        }}
      >
        <HStack
          style={{
            ...styles.task,
            width: withScreen - 40,
          }}
        >
          <Svg
            onPress={handleChangeCheckBox}
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Rect
              x="1"
              y="1"
              width="18"
              height="18"
              rx="4"
              fill={useColorModeValue("white", "#0E153A")}
              stroke={useColorModeValue("#0E153A", "#22D1EE")}
              strokeWidth="2"
            />
            <AnimatedPath
              d="M21 3C18 4.26437 11.6087 8.23448 10.0435 14C8.86957 12.1034 5.81739 8.46207 3 9.06897"
              stroke={useColorModeValue("#0E153A", "#22D1EE")}
              strokeWidth="1.52381"
              strokeLinecap="round"
              strokeDasharray={30}
              strokeDashoffset={fadePathCheckbox}
            />
          </Svg>

          <Animated.View
            style={{
              ...styles.lableTask,
              marginLeft: fadeMarginTask,
            }}
          >
            <Text
              style={{
                color: checked ? "gray" : "black",
              }}
            >
              {title}
            </Text>
            <Animated.View
              style={{
                ...styles.lableTask_lineThrough,
                scaleX: fadeLineThrough,
              }}
            ></Animated.View>
          </Animated.View>
        </HStack>

        <View style={styles.delete}>
          <Feather name="trash-2" size={24} color="tomato" />
        </View>
      </AnimatedScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },

  task: {
    height: 50,
    backgroundColor: "#E2F3F5",
    shadowColor: "#000",
    borderRadius: 4,
    paddingHorizontal: 25,
    alignItems: "center",
  },

  lableTask: {
    overflow: "hidden",
  },

  lableTask_lineThrough: {
    height: 1,
    width: "200%",
    left: "-100%",
    borderBottomWidth: 1,
    position: "absolute",
    top: 10,
    borderColor: "gray",
  },

  delete: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 150
  }
});

export default Task;
