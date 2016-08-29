jest.autoMockOff();

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const List = require('../src/js/components/List').default;

describe('List Test', () => {
	it('renders three repo links', () => {
		const rendered = TestUtils.renderIntoDocument(<List />);
		const repos = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'li');
		expect(repos.length).toEqual(3);
	})
})