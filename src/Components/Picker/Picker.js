import React, { Component } from "react";
import { View, Picker as PickerComponent } from "react-native";
import PropTypes from "prop-types";

class Picker extends Component {
  state = { user: "" };

  updateUser = user => {
    this.setState({ user: user });
    this.props.onValueChange(user);
  };

  renderItens = () => {
    return this.props.options.map((item, index) => {
      return (
        <PickerComponent.Item key={index} label={item[0]} value={item[1]} />
      );
    });
    return (
      <PickerComponent.Item
        label="Some error happened"
        value="Some error happened"
      />
    );
  };

  render() {
    const { title } = this.props;

    return (
      <View>
        <PickerComponent
          selectedValue={this.state.user}
          onValueChange={this.updateUser}
          //   prompt={title}
        >
          <PickerComponent.Item label="Escolha uma cidade" value={null} />
          {this.renderItens()}
        </PickerComponent>
      </View>
    );
  }
}
export default Picker;

Picker.defaultProps = {
  isRequired: false,
  title: "COLOQUE ALGO AQUI"
};

Picker.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onValueChange: PropTypes.func,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool
};
