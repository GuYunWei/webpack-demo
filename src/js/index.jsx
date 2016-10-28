import React from 'react';
import ReactDOM from 'react-dom';
require('./semantic.min.css');

class ProdcutList extends React.Component {
	render(){
		return (
			<div className="ui item">
					Hello, friend, I'm a basic React Component.
			</div>
		);
	}
}

ReactDOM.render(
	<ProdcutList />,
	document.getElementById('root')
)