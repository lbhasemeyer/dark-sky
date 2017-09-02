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
 	var component = shallow(<App />);
	jQuery(document).ready(function() {
	  expect(component.prop('latitude')).toEqual(40.016457);
	  expect(component.prop('longitude')).toEqual(-105.285884);
	  expect(component.prop('currentWeather')).toEqual(null);
	  expect(component.prop('temperature')).toEqual(null);
	});
});

it('should react to an input change', () => {
	var component = shallow(<App />);
	component.find('input#latitude-input').simulate('change', { target: {
		value: '9' }
	});
	component.find('input#longitude-input').simulate('change', { target: {
		value: '90' }
	});	
	jQuery(document).ready(function() {
		expect(component.prop('latitude')).toEqual(9);
		expect(component.prop('longitude')).toEqual(90);
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
