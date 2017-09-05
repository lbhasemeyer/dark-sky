import React from 'react';
import App from './App';
import Inputs from './components/latitude.longitude.inputs.react.js';
import { mount, shallow } from 'enzyme';

//uses Jest
it('renders without crashing', () => {
	expect(shallow(<App />));
});

it('has correct props on initial render', () => {
	var appComponent = shallow(<App />);
	expect(appComponent.state('latitude')).toEqual(40.016457);
	expect(appComponent.state('longitude')).toEqual(-105.285884);
	expect(appComponent.state('currentWeather')).toEqual(null);
	expect(appComponent.state('temperature')).toEqual(null);
});