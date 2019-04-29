import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "native-base";
import styles from "./HomeStyle";

class Home extends Component {
  render() {
    return (
      <View>
        <Text style={styles.header}>asdasdasdsadsad</Text>
        <Button style={styles.button}>
          <Text>Click Me!</Text>
        </Button>
      </View>
    );
  }
}
export default Home;
