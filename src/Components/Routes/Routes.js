import { createStackNavigator, createAppContainer } from "react-navigation";
import NavigationService from "../../Services/NavigationService";
import { fromRight } from "../../Layout/Effects/Effects";
import React, { Component } from "react";

import Home from "../../Containers/Home/Home";
import Map from "../../Containers/Map/Map";

const AppNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    Map: { screen: Map }
  },
  {
    headerMode: "none",
    transitionConfig: () => fromRight()
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
