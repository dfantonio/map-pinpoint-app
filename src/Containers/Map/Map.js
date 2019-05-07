import { Icon } from "native-base";
import MapView, { Marker } from "react-native-maps";
import { pins } from "./../../Services/PinsLocation";
import React, { Component } from "react";
import styles from "./MapStyle";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar
} from "react-native";

//https://github.com/react-native-community/react-native-maps/tree/master/example/examples
// https://medium.com/@princessjanf/react-native-maps-with-direction-from-current-location-ab1a371732c2

const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = 0.0121;

const HEIGHT = Dimensions.get("window").height - StatusBar.currentHeight;
const WIDTH = Dimensions.get("window").width;

class Maps extends Component {
  state = {
    region: {
      latitude: -29.685446,
      longitude: -51.133568,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    },
    renderedPins: []
  };

  componentDidMount() {
    // this.getCurrentPosition();
    this.createMarkers();
  }

  /**
   * @author Antônio Della Flora
   * @copyright 04/2019
   * @description Responsible for getting the current position of the user
   */
  getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);

        var Region = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };
        this.setState({ region: Region });
      },
      error => alert("Ocorreu algum problema com a localização:\n\n" + error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  createMarkers = () => {
    const cities = Object.keys(pins);
    let temp = [];
    let array = [];
    for (let i = 0; i < cities.length; i++) {
      temp = pins[cities[i]].map((produto, index) => {
        return (
          <View key={index}>
            <Marker
              coordinate={produto.coordinates}
              title={produto.codigo}
              // description={produto.description}
            />
          </View>
        );
      });
      array.push(temp);
    }
    this.setState({ renderedPins: array });
  };

  renderMarkers = () => {
    return this.state.renderedPins;
  };

  render() {
    return (
      <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        <MapView
          style={{ width: "100%", height: "100%" }}
          region={this.state.region}
        >
          {this.renderMarkers()}
        </MapView>
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            height: 50,
            width: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderColor: "rgb(200,200,200)",
            borderRadius: 50,
            borderWidth: 2,
            position: "absolute",
            top: HEIGHT - 60,
            left: WIDTH - 60
          }}
          onPress={() => {
            this.getCurrentPosition();
          }}
        >
          <Icon
            style={{
              color: "purple",
              fontSize: 30
            }}
            name="locate"
          />
        </TouchableOpacity>
      </View>
    );
  }
}
export default Maps;
