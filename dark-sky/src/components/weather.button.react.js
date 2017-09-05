import React, { Component } from 'react';
import '../App.css';

class WeatherButton extends Component {
  constructor(props) {
    super(props);
    this.state = {mouseHoveredActiveButton: false};
    this._mouseEnterButton = this._mouseEnterButton.bind(this);
    this._mouseLeaveButton = this._mouseLeaveButton.bind(this);
    this._getWeather = this._getWeather.bind(this);
  }
  //change button background color on hover / mouse down
  _mouseEnterButton(){
    if(this.props.latitude !== 'Please enter a valid latitude' && this.props.longitude !== 'Please enter a valid longitude'){
      this.setState({mouseHoveredActiveButton: true});
    }
  }
  //change button background color back to white on hover leave / mouse up
  _mouseLeaveButton(){
    this.setState({mouseHoveredActiveButton: false});
  }
  //call getWeather in App.js when button is clicked
  _getWeather(){
    this.props.getWeather();
  }
  render() {
    var darkColor = this.props.darkColor;
    //build the Get Weather button cursor and color
    var buttonCursor = (this.props.latitude === 'Please enter a valid latitude' || this.props.longitude === 'Please enter a valid longitude') ? 'not-allowed' : 'pointer';
    var buttonColor = (this.state.mouseHoveredActiveButton === true) ? this.props.lightColor : 'white';

    return (
      <button id='get-weather-button' style={{cursor: buttonCursor, backgroundColor: buttonColor, outline: 'none', border: '2px solid ' + darkColor, color: darkColor, borderRadius: '4px', height: '38px', paddingLeft: 10, paddingRight: 10, fontSize: '20px', width: 150, marginTop: 17}} onClick={this._getWeather} onMouseEnter={this._mouseEnterButton} onMouseLeave={this._mouseLeaveButton} onMouseUp={this._mouseLeaveButton} onMouseDown={this._mouseEnterButton}>
        Get Weather
      </button>
    );
  }
}

export default WeatherButton;
