import React, { Component } from "react";

class MakeRequestTextForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        fullName: "",
        numberOfPeople: 0,
        personalStory: ""
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
  
    render() {
      return (
        <form>
          <label>
            Full Name:
            <input
              name="fullName"
              type="text"
              checked={this.state.fullName}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Number of People:
            <input
              name="numberOfPeople"
              type="number"
              value={this.state.numberOfPeople}
              onChange={this.handleInputChange} />
          </label>
          <label>
            Number of People:
            <textarea
              name="personalStory"
              value={this.state.personalStory}
              onChange={this.handleInputChange} />
          </label>
        </form>
      );
    }
  }

  export default MakeRequestTextForm;