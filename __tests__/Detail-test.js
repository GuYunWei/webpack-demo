jest.autoMockOff();

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Detail = require('../src/js/components/Detail').default;

describe('Detail Test', () => {
	it('starts with zero commits', () => {
		const rendered = TestUtils.renderIntoDocument(<Detail params={{repo: ''}} />);
		expect(rendered.state.commits.length).toEqual(0);
	})
	it('show commits by default', () => {
		const rendered = TestUtils.renderIntoDocument(<Detail params={{repo: ''}} />);
		expect(rendered.state.mode).toEqual('commits');
	})
	it('shows forks when the button is tapped', () => {
		const rendered = TestUtils.renderIntoDocument(<Detail params={{repo: ''}} />);
		// const btns = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'button');
		const forksButton = rendered.refs.forks;
		TestUtils.Simulate.click(forksButton);
		expect(rendered.state.mode).toEqual('forks');
	})
	it('fetches forks from GitHub', () => {
		const rendered = TestUtils.renderIntoDocument(<Detail params={{repo: ''}} />);
		waitsFor(() => {
			console.log('In waitsFor: ' + rendered.state.forks.length);
			return rendered.state.forks.length > 0;
		}, "commits to be set", 2000);
		runs(() => {
			expect(rendered.state.forks.length).toEqual(30);
		});
	})
	it('fetches forks from a local source', () => {
		const rendered = TestUtils.renderIntoDocument(<Detail params={{repo: ''}} />);
		const testData = require('./forks.json');
		// rendered.setState({ 'mode': 'forks', forks: testData});
		rendered.saveFeed('forks', testData);
		rendered.selectMode('forks');
		const forks = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'github');
		expect(forks.length).toEqual(30);
	})
})