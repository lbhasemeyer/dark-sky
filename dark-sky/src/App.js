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
import Thermometer from './components/thermometer.react.js';
import WeatherButton from './components/weather.button.react.js';
import LatitudeLongitudeInputs from './components/latitude.longitude.inputs.react.js';
var jQuery = require('jquery');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {latitude: 40.016457, longitude: -105.285884, currentWeather: null, temperature: null};
    this.getWeather = this.getWeather.bind(this);
    this.changeLatitude = this.changeLatitude.bind(this);
    this.changeLongitude = this.changeLongitude.bind(this);
    this._preventScroll = this._preventScroll.bind(this);
    this._enterKeyHit = this._enterKeyHit.bind(this);
  }
  //when component mounts, getWeather for the default location (40.016457, -105.285884)
  //also prevent scroll actions and listen for the enter keypress, which will run getWeather
  componentDidMount() {
    this.getWeather();
    document.addEventListener('scroll', this._preventScroll);
    document.addEventListener('keypress', this._enterKeyHit);    
  }
  //remove event listeners before component is destroyed
  componentWillUnmount() {
    document.removeEventListener('scroll', this._preventScroll);
    document.removeEventListener('keypress', this._enterKeyHit);
  }
  _preventScroll() {
    window.scrollTo( 0, 0 );
  }
  //if the enter key is hit, get weather again.
  _enterKeyHit(target){
    if (target.charCode === 13) {
      this.getWeather();
    }  
  }
  //this uses jsonp to hit the dark sky API and clear inputs.
  getWeather(){
    var latitude = this.state.latitude;
    var longitude = this.state.longitude;
    if(latitude !== 'Please enter a valid latitude' && longitude !== 'Please enter a valid longitude'){
      var that = this;
      var currentWeather;
      var temperature;
      jQuery(document).ready(function($) {
          $.ajax({                    
            url : "https://api.darksky.net/forecast/c210d026b6d4c102cdd37bb5df44061f/" + latitude + "," + longitude + "?exclude=daily, flags, hourly, minutely",
            dataType : "jsonp",
            success : function(response) {
              var currentConditions = response.currently;
              currentWeather = currentConditions.icon;
              temperature = currentConditions.temperature;
              that.setState({currentWeather: currentWeather, temperature: temperature});
            }
          });
      });
      document.getElementById('latitude-input').value = '';
      document.getElementById('longitude-input').value = '';
    }
  }
  //when the latitude input changes, update latitude state.
  changeLatitude(newValue){
    this.setState({latitude: newValue});
  }
  //when the longitude input changes, update latitude state.
  changeLongitude(newValue){
    this.setState({longitude: newValue});
  }
  //this function builds an array of div drops when the currentWeather is snow or rain.
  _buildDrops(iconSrc){
    var dropArrayToReturn = [];
    for(var i=0; i<5; i++){
      var classForDrop = 'falling falling' + i;
      dropArrayToReturn.push(<div key={i} className={classForDrop}><img src={iconSrc} className='falling-icon' alt='' /></div>);
    }
    return dropArrayToReturn;
  }
  render() {
    //based on the currentWeather, set colors and icons for the page.
    var currentWeather = this.state.currentWeather;
    var currentTemperature = this.state.temperature;
    var lightColor;
    var darkColor;
    var iconSrc;
    var dropArray = [];
    var spin = false;
    var slideOut = false;
    switch(currentWeather) {
      case 'clear-day':
        iconSrc = ClearDay;
        lightColor = 'orange';
        darkColor = 'red';
        spin = true;
        break;
      case 'clear-night':
        iconSrc = ClearNight;
        lightColor = 'blue';
        darkColor = 'black';
        break;
      case 'rain':
        iconSrc = Rain;
        lightColor = '#ADD8E6';
        darkColor = 'blue';
        dropArray = this._buildDrops(iconSrc);
        break;
      case 'snow':
        iconSrc = Snow;
        lightColor = 'lightgrey';
        darkColor = 'gray';
        dropArray = this._buildDrops(iconSrc);
        break;
      case 'sleet':
        iconSrc = Rain;
        lightColor = '#ADD8E6';
        darkColor = '#4d4d4d';
        dropArray = this._buildDrops(iconSrc);
        break;
      case 'wind':
        iconSrc = Wind;
        lightColor = '#BA55D3';
        darkColor = '#AA00FF';
        slideOut = true;
        break;
      case 'fog':
        iconSrc = Foggy;
        lightColor = '#b5651d';
        darkColor = '#654321';
        break;
      case 'cloudy':
        lightColor = '#B4CDCD';
        darkColor = '#528B8B';       
        iconSrc = Cloudy;
        break;
      case 'partly-cloudy-day':
        lightColor = '#00EEEE';
        darkColor = '#7A8B8B';    
        iconSrc = CloudyDay;
        break;
      case 'partly-cloudy-night':
        lightColor = '#003366';
        darkColor = 'black';
        iconSrc = CloudyNight;
        break;
      default:
        lightColor = 'white';
        darkColor = 'white';
        iconSrc = null;
    }
    //if no icons were added to the dropArray, we want one big icon to show.  adding spin and slide action classes.
    var weatherIcon;
    if(dropArray.length>0){
      weatherIcon = dropArray;
    } else {
      var classForIcon = (spin === true) ? 'big-icon spinning-icon' : 'big-icon';
      if(slideOut === true){
        classForIcon += ' sliding-icon';
      }
      weatherIcon = <img src={iconSrc} className={classForIcon} alt='' />;
    }

    var latitudeLongitudeInputs = <LatitudeLongitudeInputs lightColor={lightColor} darkColor={darkColor} latitude={this.state.latitude} longitude={this.state.longitude} changeLatitude={this.changeLatitude} changeLongitude={this.changeLongitude} />;
    var getWeatherButton = <WeatherButton latitude={this.state.latitude} longitude={this.state.longitude} lightColor={lightColor} darkColor={darkColor} getWeather={this.getWeather} />
    var thermometer = <Thermometer currentTemperature={currentTemperature} lightColor={lightColor} darkColor={darkColor} />;

    return (
      <div className='App'>
        <div className='App-header'>
          {latitudeLongitudeInputs}
          {getWeatherButton}
        </div>
        <div className='App-intro'>
          {weatherIcon}
        </div>
        <div style={{position: 'absolute', left: '50%', bottom: 0, width: 2, height: '10vh', minHeight: 40,backgroundColor: darkColor}} />
        {thermometer}
      </div>
    );
  }
}

export default App;