import React, { Component } from 'react';
import '../App.css';

class WeatherButton extends Component {
  constructor(props) {
    super(props);
    this._changeLatitude = this._changeLatitude.bind(this);
    this._changeLongitude = this._changeLongitude.bind(this);
  }
  //validate the new latitude and pass to App.js to change state
  _changeLatitude(event){
    var newValue = (event.target.value === '' || event.target.value < -90 || event.target.value > 90) ? 'Please enter a valid latitude' : parseInt(event.target.value, 10);
    this.props.changeLatitude(newValue);
  }
  //validate the new longitude and pass to App.js to change state  
  _changeLongitude(event){
    var newValue = (event.target.value === '' || event.target.value < -180 || event.target.value > 180 ) ? 'Please enter a valid longitude' : parseInt(event.target.value, 10);
    this.props.changeLongitude(newValue);
  }
  render() {
    var latitude = this.props.latitude;
    var longitude = this.props.longitude;
    var darkColor = this.props.darkColor;
    var lightColor = this.props.lightColor;

    return (
      <div>
        <span>
          <input id='latitude-input' style={{outline: 'none', width: 130, border: '1px solid ' + lightColor, borderRadius: '4px', height: '30px', paddingLeft: 10, paddingRight: 10}} type='number' min='-90' max='90' onChange={this._changeLatitude} />
          <div style={{color: darkColor, fontSize: 18}}>{latitude}</div>
        </span>
        <span>
          <input id='longitude-input' style={{outline: 'none', width: 130, border: '1px solid ' + lightColor, borderRadius: '4px', height: '30px', paddingLeft: 10, paddingRight: 10}} type='number' min='-180' max='180' onChange={this._changeLongitude} />
          <div style={{color: darkColor, fontSize: 18}}>{longitude}</div>
        </span>
      </div>
    );
  }
}

export default WeatherButton;
