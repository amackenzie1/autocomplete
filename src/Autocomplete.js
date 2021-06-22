import React, { Component, Fragment } from "react";
import './styles.css'
import {findBestMatch, compareTwoStrings} from "string-similarity";


function compare(a, b){
  if (a.rating > b.rating){
      return -1;
  } else if (a.rating < b.rating){
      return 1;
  }
  else {
      return 0;
  }
}


function score(text, query){
  text = text.toLowerCase().split(" ");
  query = query.toLowerCase().split(" ");
  var total_score = 0
  for (var i in text){
      for (var j in query){
          total_score += compareTwoStrings(text[i], query[j])**2
      }
  }
  return total_score
}

function make_object(text, query){
  return {"target": text, "rating": score(text, query)};
}


class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    };
  }
  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
  
    /*const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );*/

    var results = suggestions.map((x) => make_object(x, userInput))
    const filteredSuggestions = results.sort(compare).map((object) => object.target).slice(0, 5);
  
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };
  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;
  
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };
  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;
  
    let suggestionsListComponent;
    if (showSuggestions && userInput) {
        if (filteredSuggestions.length) {
          suggestionsListComponent = (
            <ul class="suggestions">
              {filteredSuggestions.map((suggestion, index) => {
                let className;
      
                // Flag the active suggestion with a class
                if (index === activeSuggestion) {
                  className = "suggestion-active";
                }
                return (
                  <li className={className} key={suggestion} onClick={onClick}>
                    {suggestion}
                  </li>
                );
              })}
            </ul>
          );
        } else {
          suggestionsListComponent = (
            <div class="no-suggestions">
              <em>No suggestions available.</em>
            </div>
          );
        }
      }
      return (
        <Fragment>
          <input
            type="text"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
            spellcheck="false"
          />
          {suggestionsListComponent}
        </Fragment>
      );
  }
}
  
export default Autocomplete;