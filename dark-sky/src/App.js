import React, { Component } from 'react';
import sun from './sun.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {latitude: 40.016457, longitude: -105.285884, hrefURL: null};
    this.clickWeatherIcon = this.clickWeatherIcon.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.changeLatitude = this.changeLatitude.bind(this);
    this.changeLongitude = this.changeLongitude.bind(this);
  }
  componentWillMount() {
    this.setState({hrefURL: "https://api.darksky.net/forecast/c210d026b6d4c102cdd37bb5df44061f/" + this.state.latitude + "," + this.state.longitude});
  }
  clickWeatherIcon(){
    alert('weather clicked - animate something?');
  }
  getWeather(){
    //alert('get weather: ' + this.state.latitude + ', ' + this.state.longitude);
  }
  changeLatitude(event){
    this.setState({latitude: event.target.value});
    this.setState({hrefURL: "https://api.darksky.net/forecast/c210d026b6d4c102cdd37bb5df44061f/" + event.target.value + "," + this.state.longitude});
  }
  changeLongitude(event){
    this.setState({longitude: event.target.value});
    this.setState({hrefURL: "https://api.darksky.net/forecast/c210d026b6d4c102cdd37bb5df44061f/" + this.state.latitude + "," + event.target.value});
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <span>
            <input onChange={this.changeLatitude} />
            <div style={{color: "red"}}>{this.state.latitude}</div>
          </span>
          <span>
            <input onChange={this.changeLongitude} />
            <div style={{color: "red"}}>{this.state.longitude}</div>
          </span>
          <button onClick={this.getWeather}>
            <a href={this.state.hrefURL} style={{textDecoration: 'none'}}>Get Weather</a>
          </button>
        </div>
        <p className="App-intro">
          <img src={sun} className="App-logo" alt="logo" onClick={this.clickWeatherIcon}/>
        </p>
      </div>
    );
  }
}

export default App;
