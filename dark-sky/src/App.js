import React, { Component } from 'react';
import ClearDay from './icons/clearDay.svg';
import ClearNight from './icons/clearNight.svg';
import Rain from './icons/rain.svg';
import Snow from './icons/snow.svg';
import Wind from './icons/wind.svg';
import Cloudy from './icons/cloudy.svg';
import Foggy from './icons/foggy.svg';
import CloudyNight from './icons/cloudyNight.svg';
import CloudyDay from './icons/cloudyDay.svg';
import './App.css';
var jQuery = require("jquery");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {latitude: 40.016457, longitude: -105.285884, hrefURL: null, currentWeather: null, temperature: null};
    this.getWeather = this.getWeather.bind(this);
    this.changeLatitude = this.changeLatitude.bind(this);
    this.changeLongitude = this.changeLongitude.bind(this);
    this.noscroll = this.noscroll.bind(this);
    this.enter = this.enter.bind(this);
  }
  componentDidMount() {
    this.setState({hrefURL: "https://api.darksky.net/forecast/c210d026b6d4c102cdd37bb5df44061f/" + this.state.latitude + "," + this.state.longitude});
    this.getWeather();
    document.addEventListener('scroll', this.noscroll);
    document.addEventListener('keypress', this.enter);    
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.noscroll);
    document.removeEventListener('keypress', this.enter);
  }
  noscroll() {
    window.scrollTo( 0, 0 );
  }
  enter(target){
    if (target.charCode === 13) {
      this.getWeather();
    }  
  }
  getWeather(){
    var latitude = this.state.latitude;
    var longitude = this.state.longitude;
    if(latitude !== 'Please enter a valid latitude' && longitude !== 'Please enter a valid longitude'){
      var that = this;
      var currentWeather;
      var temperature;
      jQuery(document).ready(function($) {
          $.ajax({                    
            url : "https://api.darksky.net/forecast/c210d026b6d4c102cdd37bb5df44061f/" + latitude + "," + longitude,
            dataType : "jsonp",
            success : function(response) {
              var currentConditions = response.currently;
              currentWeather = currentConditions.icon;
              temperature = currentConditions.temperature;
              that.setState({currentWeather: currentWeather, temperature: temperature});
            }
          });
      });
      document.getElementById('latitude-input').value = "";
      document.getElementById('longitude-input').value = "";
    }
  }
  changeLatitude(event){
    var newValue = (event.target.value === '' || event.target.value < -90 || event.target.value > 90) ? 'Please enter a valid latitude' : parseInt(event.target.value, 10);
    this.setState({latitude: newValue});
  }
  changeLongitude(event){
    var newValue = (event.target.value === '' || event.target.value < -180 || event.target.value > 180 ) ? 'Please enter a valid longitude' : parseInt(event.target.value, 10);
    this.setState({longitude: newValue});
  }
  buildDrops(iconSrc){
    var dropArrayToReturn = [];
    for(var i=0; i<5; i++){
      var classForDrop = 'falling falling' + i;
      dropArrayToReturn.push(<div key={i} className={classForDrop}><img src={iconSrc} className="falling-icon" alt="logo"/></div>);
    }
    return dropArrayToReturn;
  }
  render() {
    var currentWeather = this.state.currentWeather;
    var currentTemperature = this.state.temperature;
    var iconSrc;
    var dropArray = [];
    var spin = false;
    var lightColor = "orange";
    var darkColor = "red";
    switch(currentWeather) {
      case 'clear-day':
        iconSrc = ClearDay;
        spin = true;
        break;
      case 'clear-night':
        iconSrc = ClearNight;
        lightColor = "blue";
        darkColor = "black";
        break;
      case 'rain':
        iconSrc = Rain;
        lightColor = "#ADD8E6";
        darkColor = "blue";
        dropArray = this.buildDrops(iconSrc);
        break;
      case 'snow':
        iconSrc = Snow;
        lightColor = "lightgrey";
        darkColor = "gray";
        dropArray = this.buildDrops(iconSrc);
        break;
      case 'sleet':
        iconSrc = Rain;
        lightColor = "#ADD8E6";
        darkColor = "blue";
        dropArray = this.buildDrops(iconSrc);
        break;
      case 'wind':
        //make words blow off page
        iconSrc = Wind;
        lightColor = "pink";
        darkColor = "purple";
        break;
      case 'fog':
        iconSrc = Foggy;
        lightColor = "#b5651d";
        darkColor = "brown";
        break;
      case 'cloudy':
        iconSrc = Cloudy;
        break;
      case 'partly-cloudy-day':
        iconSrc = CloudyDay;
        break;
      case 'partly-cloudy-night':
        lightColor = 'blue';
        darkColor = "#003366";
        iconSrc = CloudyNight;
        break;
      default:
        iconSrc = ClearDay;
    }

    var weatherIcon;
    if(dropArray.length>0){
      weatherIcon = dropArray;
    } else {
      var classForIcon = (spin === true) ? "big-icon spinning-icon" : "big-icon";
      weatherIcon = <img src={iconSrc} className={classForIcon} alt="logo"/>;
    }

    var temperature = Math.abs(currentTemperature) + '%';
    var bar = (currentTemperature>=0) ? 
      (<div style={{width: '50%', float: 'right'}}>
        <div style={{display: 'inline-block'}}>{currentTemperature} °F</div>
          <div style={{width: temperature, height: 20, backgroundColor: lightColor, float: 'left'}}>
          </div>
        </div>) : 
      (<div style={{width: '50%', float: 'left'}}>
        <div style={{display: 'inline-block'}}>{currentTemperature} °F</div>
          <div style={{width: temperature, height: 20, backgroundColor: darkColor, float: 'right'}}>
          </div>
        </div>);
    var temperatureBar = 
      <div style={{width: '100%', height: 20, position: 'absolute', bottom: 0}}>
        {bar}
      </div>;

    return (
      <div className="App">
        <div className="App-header">
          <span>
            <input id="latitude-input" style={{outline: 'none', border: '1px solid ' + lightColor, borderRadius: '4px', height: '30px', paddingLeft: 10, paddingRight: 10}} type="number" min="-90" max="90" onChange={this.changeLatitude} />
            <div style={{color: darkColor}}>{this.state.latitude}</div>
          </span>
          <span>
            <input id="longitude-input" style={{outline: 'none', border: '1px solid ' + lightColor, borderRadius: '4px', height: '30px', paddingLeft: 10, paddingRight: 10}} type="number" min="-180" max="180" onChange={this.changeLongitude} />
            <div style={{color: darkColor}}>{this.state.longitude}</div>
          </span>
          <button style={{outline: 'none', border: '2px solid ' + darkColor, color: darkColor, borderRadius: '4px', height: '38px', paddingLeft: 10, paddingRight: 10, fontSize: '20px', width: 150, marginTop: 17, backgroundColor: 'white'}} onClick={this.getWeather}>
            Get Weather
          </button>
        </div>
        <p className="App-intro">
          {weatherIcon}
        </p>
        {temperatureBar}
      </div>
    );
  }
}

export default App;

// <a href={this.state.hrefURL} style={{textDecoration: 'none'}}>Get Weather</a>