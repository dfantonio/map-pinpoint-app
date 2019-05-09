const DEVICE_HEIGHT = Dimensions.get("window").height;
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
  View,
  Text
} from "react-native";

class AutoComplete extends Component {
  state = {
    userInput: "",
    textSearch: [],
    filteredOptions: []
  };

  /**
   * @author Antônio Della Flora
   * @description Generates the text strings shown in the suggestions
   * and re-create it when the props change
   */
  componentWillReceiveProps(newProps) {
    const { options } = this.props;
    if (newProps.options) {
      let temp = [];
      newProps.options.map((item, index) => {
        temp.push(["(" + item.codigo + ") " + item.endereco, index]);
      });
      if (options !== newProps.options) this.setState({ textSearch: temp });
    }
  }

  /**
   * @author Antônio Della Flora
   * @description Renders the components for each suggestion
   * @returns {object} For each suggestion to be rendered
   */
  renderSuggestions() {
    const { userInput } = this.state;
    const options = this.findInputs(userInput);
    const suggestions =
      options.length === 1 && userInput.search(options[0].codigo) >= 0
        ? []
        : options;

    return suggestions.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => {
            this.setState({ userInput: item.codigo });
          }}
        >
          <Text>
            ({item.codigo}) {item.endereco}
          </Text>
        </TouchableOpacity>
      );
    });
  }

  /**
   * @author Antônio Della Flora
   * @description It's called to determine which suggestions will be shown in the suggestions.
   * @param {String} query -The keyword to search in the array
   * @returns {array} The filtered suggestions
   */
  findInputs(query) {
    const { textSearch } = this.state;
    const array = [];

    if (query === "") {
      //if the query is null then return blank
      return [];
    }

    //I needed to remove parentheses from query or it would crash the regex
    query = query.replace(/[()]+/g, "");

    // This is a regex code to match insensitive case words
    const regex = new RegExp(`${query}`, "i");

    textSearch.map((item, index) => {
      if (item[0].search(regex) >= 0) array.push(this.props.options[index]);
    });

    return array;
  }

  /**
   * @author Antônio	Della Flora
   * @todo Change the styles to a new file
   * @todo Add some kind of effect to the suggestions, like a gray border or something like that
   * @todo Allow the component to receive props for the style of each part of the component
   */
  render() {
    const { placeholder } = this.props;
    const { userInput } = this.state;

    return (
      <View>
        <View
          style={{
            borderRadius: 20,
            borderColor: "rgb(200,200,200)",
            borderWidth: 3
          }}
        >
          <TextInput
            placeholder={placeholder}
            style={{ marginLeft: 10 }}
            onChangeText={text => {
              this.setState({ userInput: text });
            }}
            value={userInput}
          />
        </View>
        {this.findInputs(userInput).length > 1 ? (
          <View
            style={{
              borderRadius: 20,
              borderColor: "rgb(200,200,200)",
              borderWidth: 3
            }}
          >
            <ScrollView
              style={{ maxHeight: DEVICE_HEIGHT * 0.5, marginLeft: 10 }}
            >
              {this.renderSuggestions()}
            </ScrollView>
          </View>
        ) : null}
      </View>
    );
  }
}
export default AutoComplete;

AutoComplete.defaultProps = {
  placeholder: "Digite algo"
};

AutoComplete.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string
};

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    margin: 20,
    backgroundColor: "orange",
    margin: 10,
    textAlign: "center",
    fontSize: 20,
    paddingTop: 70
  }
});
