import React from 'react';
import { Link, IndexLink } from 'react-router';

export default class List extends React.Component {
	render() {
		return (
			<div>
				<p>Please choose a resposity form the list below.</p>
				<ul>
					<li><Link to="/detail/react">React</Link></li>
					<li><Link to="/detail/react-native">React Native</Link></li>
					<li><Link to="/detail/jest">Jest</Link></li>
				</ul>
			</div>
		);
	}
}