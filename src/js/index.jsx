import React from 'react';
import ReactDOM from 'react-dom';
import '../css/semantic.min.css';
import './index.css';
// import icon1 from '../images/1.png';
// import avatar1 from '../images/1a.png';

class ProdcutList extends React.Component {
	render(){
		return (
			<div className="ui item">
					<Product />
			</div>
		);
	}
}

class Product extends React.Component {
	render(){
		return (
			<div className="item">
				<div className="image">
					<img src={require('../images/1.png')} />
				</div>
				<div className="middle aligned content">
					<div className="header">
						<a><i className="large caret up icon"></i></a>
					</div>
					<div className="description">
						<a href="">Fort knight</a>
						<p>Authentic renaissance actors, delievered in just two weeks.</p>
					</div>
					<div className="extra">
						<span>Submited By:</span>
						<img className="ui avatar image" src={require('../images/1a.png')} />
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<ProdcutList />,
	document.getElementById('root')
)