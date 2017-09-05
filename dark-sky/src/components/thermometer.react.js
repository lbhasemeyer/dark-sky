import React, { Component } from 'react';
import '../App.css';

class Thermometer extends Component {
  render() {
    var currentTemperature = this.props.currentTemperature;
    var darkColor = this.props.darkColor;
    var lightColor = this.props.lightColor;
    //set width of temperature bar based on |temperature|.  multiplying by .6 so temperatures up to 140F will comfortably fit on the fullscreen.
    var temperature = Math.abs(currentTemperature)*.6 + '%';
    //calculate temperature output
    var positiveOrNegativeSign = (currentTemperature >= 0) ? '+' : '-';
    var currentTemperatureFarenheit = (currentTemperature !== null) ? currentTemperature + '°F' : '';
    //build the thermometer bar - going right for positive temperatures and left for negative temperatures. 
    var bar;
    if(currentTemperature!==0){
      bar = 
        (<div style={{width: '50%', float: (currentTemperature>0) ? 'right' : 'left'}}>
          <div style={{width: temperature, height: '5vh', minHeight: 20, backgroundColor: lightColor, float: (currentTemperature>0) ? 'left' : 'right'}} />
          <div style={{display: 'inline-block', fontSize: 20, float: (currentTemperature>0) ? 'left' : 'right', paddingLeft: 5, paddingRight: 5, color: darkColor}}>
            {currentTemperatureFarenheit}
          </div> 
        </div>)
    } else {
      bar = (<div style={{display: 'inline-block'}}>{positiveOrNegativeSign}{currentTemperature} °F</div>);
    }
    var temperatureBar = 
      <div style={{width: '100%', height: '5vh', minHeight: 20, position: 'absolute', bottom: 0}}>
        <div style={{position: 'absolute', left: '48%', bottom: 'calc(20px + 2vh)', lineHeight: '25px', fontSize: 20, color: darkColor}}>-</div>
        {bar}
        <div style={{position: 'absolute', left: '52%', bottom: 'calc(20px + 2vh)', lineHeight: '25px', fontSize: 20, color: darkColor}}>+</div>
      </div>;

    return (
      <div>
        {temperatureBar}
      </div>
    );
  }
}

export default Thermometer;
