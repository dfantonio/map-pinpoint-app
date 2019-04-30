import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "native-base";
import styles from "./HomeStyle";

class Home extends Component {
  render() {
    return (
      <View>
        <Text style={styles.header}>Imagine um título legal aqui</Text>
        <Button
          // rounded
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("Map");
          }}
        >
          <Text style={{ color: "white" }}>Click Me!</Text>
        </Button>
      </View>
    );
  }
}
export default Home;
