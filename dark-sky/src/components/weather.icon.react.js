import React, { Component } from 'react';
import '../App.css';

class WeatherIcon extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    //build the weather icon / dropArray of icons with animation classes
    var weatherIcon;
    if(this.props.dropArray.length>0){
      weatherIcon = this.props.dropArray;
    } else {
      var classForIcon = (this.props.spin === true) ? 'big-icon spinning-icon' : 'big-icon';
      if(this.props.slideOut === true){
        classForIcon += ' sliding-icon';
      }
      weatherIcon = <img src={this.props.iconSrc} className={classForIcon} alt='' />;
    }

    return (
      <div>
        {weatherIcon}
      </div>
    );
  }
}

export default WeatherIcon;
