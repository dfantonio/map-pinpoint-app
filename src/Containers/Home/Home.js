// import Autocomplete from "react-native-autocomplete-input";
import Autocomplete from "../../Components/AutoComplete/AutoComplete";
import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "native-base";
import styles from "./HomeStyle";
import Picker from "../../Components/Picker/Picker";
import { pins } from "./../../Services/PinsLocation";

class Home extends Component {
  state = {
    pickerList: [],
    pickerUser: ""
  };

  componentDidMount() {
    let array = [];
    let cities = Object.keys(pins);
    for (let i = 0; i < cities.length; i++) {
      array.push([pins[cities[i]][0].cidade, cities[i]]);
    }
    this.setState({ pickerList: array });
  }

  render() {
    const { pickerList } = this.state;

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
        <Picker
          onValueChange={user => {
            this.setState({ pickerUser: user });
          }}
          title={"Escolha a cidade"}
          options={pickerList}
        />
        <Autocomplete />
      </View>
    );
  }
}
export default Home;
