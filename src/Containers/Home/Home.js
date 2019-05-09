import Autocomplete from "../../Components/AutoComplete/AutoComplete";
import React, { Component } from "react";
import { View, Text, KeyboardAvoidingView } from "react-native";
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
      <View style={{ flex: 1, width: "90%", alignSelf: "center" }}>
        <Text style={styles.header}>Localizador de armários</Text>
        <View
          style={{
            borderRadius: 20,
            borderColor: "rgb(200,200,200)",
            borderWidth: 3
          }}
        >
          <Picker
            onValueChange={user => {
              this.setState({ pickerUser: user });
            }}
            title={"Escolha a cidade"}
            options={pickerList}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Autocomplete
            placeholder={"Digite o código do armário"}
            options={pins[this.state.pickerUser]}
          />
        </View>
        <Button
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("Map");
          }}
        >
          <Text style={{ color: "white" }}>Ver todos os armários</Text>
        </Button>
      </View>
    );
  }
}
export default Home;
