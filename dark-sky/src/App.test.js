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

it('reacts to input changes', () => {
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

it('clears input and maintains/gets new state values on button push', () => {
	jQuery(document).ready(function() {
		var component = shallow(<App />);
		component.find('input#latitude-input').simulate('change', { target: {
			value: '19' }
		});
		component.find('button#get-weather-button').simulate('click');
		var latitudeInput = component.find('input#latitude-input');
		expect(latitudeInput).value.toEqual('');
		expect(component.prop('latitude')).toEqual(19);
		expect(component.prop('currentWeather')).not.toEqual(null);
		expect(component.prop('temperature')).not.toEqual(null);	
		expect(getWeather.called).to.be.true;		
	});
});

it('fires getWeather only on only enter keydown', () => {
	jQuery(document).ready(function() {
		var component = shallow(<App />);
		var latitudeInput = component.find('input#latitude-input');
		latitudeInput.simulate('change', { target: {
			value: '19' }
		});
		latitudeInput.simulate('keyDown', {keyCode: 13});
		expect(getWeather.called).to.be.true;	

		latitudeInput.simulate('keyDown', {keyCode: 40});
		expect(getWeather.called).to.be.false;	
	});
});
