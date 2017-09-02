import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import { getWeather } from './App';
var jQuery = require("jquery");

//uses Jest
it('renders without crashing', () => {
	shallow(<App />);
});

it('has props on initial render', () => {
	jQuery(document).ready(function() {
		var component = shallow(<App />);
		expect(component.prop('latitude')).toEqual(40.016457);
		expect(component.prop('longitude')).toEqual(-105.285884);
		expect(component.prop('currentWeather')).toEqual(null);
		expect(component.prop('temperature')).toEqual(null);
	});
});

it('should react to an input change', () => {
	jQuery(document).ready(function() {
		var component = shallow(<App />);
		component.find('input#latitude-input').simulate('change', { target: {
			value: '9' }
		});
		component.find('input#longitude-input').simulate('change', { target: {
			value: '90' }
		});	
		expect(component.prop('latitude')).toEqual(9);
		expect(component.prop('longitude')).toEqual(90);
	});
});

it('should clear input on button push', () => {
	jQuery(document).ready(function() {
		var component = shallow(<App />);
		component.find('input#latitude-input').simulate('change', { target: {
			value: '19' }
		});
		component.find('button#get-weather-button').simulate('click');
		var latitudeInput = component.find('input#latitude-input');
		expect(latitudeInput).value.toEqual('');
		expect(component.prop('latitude')).toEqual(19);
	});
});

it('should react to the button push', () => {
	jQuery(document).ready(function() {
		var component = shallow(<App />);
		component.find('button#get-weather-button').simulate('click');
		expect(component.prop('currentWeather')).not.toEqual(null);
		expect(component.prop('temperature')).not.toEqual(null);
	});
});

// describe('Addition', () => {
//   it('knows that 2 and 2 make 4', () => {
//     expect(2 + 2).toBe(4);
//   });
// });

// it('gets weather using getWeather', () => {
// 	const startState = {
// 	  appState: [{latitude: 40.016457, longitude: -105.285884, currentWeather: null, temperature: null}]
// 	};

// 	const finState = getWeather();

// 	expect(finState.appState).toEqual([
// 	  {latitude: 40.016457, longitude: -105.285884, currentWeather: null, temperature: null}
// 	]);
// });
