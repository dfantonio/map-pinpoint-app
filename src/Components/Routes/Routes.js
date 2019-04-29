import React, { Component } from "react";
import NavigationService from "../../Services/NavigationService";
import { fromRight } from "../../Layout/Effects/Effects";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Home from "../../Containers/Home/Home";

const AppNavigator = createStackNavigator(
  {
    Home: { screen: Home }
    //UI-001
    //   Login: { screen: Login },
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
