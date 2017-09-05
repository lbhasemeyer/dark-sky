import React from 'react';import App from './App';
import { mount, shallow } from 'enzyme';

//uses Jest
it('renders without crashing', () => {
	expect(shallow(<App />).contains('Get Weather')).toBe(true);
});

it('has correct props on initial render', () => {
	var component = shallow(<App />);
	expect(shallow(<App />).contains('Get Weather')).toBe(true);
	expect(component.state('latitude')).toEqual(40.016457);
	expect(component.state('longitude')).toEqual(-105.285884);
	expect(component.state('currentWeather')).toEqual(null);
	expect(component.state('temperature')).toEqual(null);
});

it('reacts to input changes', () => {
	var component = shallow(<App />);
	component.find('input#latitude-input').simulate('change', { target: {
		value: '9' }
	});
	component.find('input#longitude-input').simulate('change', { target: {
		value: '90' }
	});	
	expect(component.state('latitude')).toEqual(9);
	expect(component.state('longitude')).toEqual(90);
});