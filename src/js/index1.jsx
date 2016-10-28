import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, useRouterHistory } from 'react-router';
// import { createHashHistory } from 'history';
// import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import { Provider, connect } from 'react-redux';
// import * as reducers from '../reducers/index';
// import createLogger from 'redux-logger';
// import promise from 'redux-promise';
// import thunk from 'redux-thunk';
// import routes from './routes';

// const logger = createLogger();
// const history = useRouterHistory(createHashHistory)({ queryKey: false });
// let reducer = combineReducers(reducers);
// let middleware = [thunk, promise];

//# if (process.env.NODE_ENV === `development`) {
//#   const createLogger = require(`redux-logger`);
//#   const logger = createLogger();
//#   middlewares.push(logger);
//# }

//# let reducer = combineReducers({ visibilityFilter, todos });
//# let store = createStore(reducer);

// ReactDOM.render(
// 	<Router history={history} onUpdate={() => window.scrollTo(0, 0)} routes={routes} />,
// 	document.getElementById('root')
// );

// ReactDOM.render(
//   <Provider store={store}>
//     <Router history={history} routes={routes} />
//   </Provider>,
// 	document.getElementById('root')
// );






// let finalCreateStore;

// 生产环境中，我们希望只使用 middleware。
// 而在开发环境中，我们还希望使用一些 redux-devtools 提供的一些 store 增强器。
// UglifyJS 会在构建过程中把一些不会执行的死代码去除掉。

// if (process.env.NODE_ENV === 'production') {
//   finalCreateStore = applyMiddleware(...middleware)(createStore);
// } else {
//   const createLogger = require(`redux-logger`);
//   const logger = createLogger();
//   middlewares.push(logger);
//   finalCreateStore = compose(
//     applyMiddleware(...middleware),
//     require('redux-devtools').devTools(),
//     require('redux-devtools').persistState(
//       window.location.href.match(/[?&]debug_session=([^&]+)\b/)
//     ),
//     createStore
//   );
// }

// let store = finalCreateStore(reducer);

class ProductCategoryRow extends React.Component {
	render(){
		return (
				<tr><th colSpan="2">{ this.props.category }</th></tr>
			);
	}
}

class ProductRow extends React.Component {
	render(){
		const name = this.props.product.stocked ? this.props.product.name : <span style={{color: 'red'}}>{ this.props.product.name }</span>;
		return (
				<tr>
					<td>{ name }</td>
					<td>{ this.props.product.price }</td>
				</tr>
			);
	}
}

class ProdcutTable extends React.Component {
	render(){
		const rows = [];
		let lastCategory = null;
		this.props.products.forEach(product => {
			if(product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)){
				return;
			}
			if(product.category !== lastCategory){
				rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
			}
			rows.push(<ProductRow product={product} key={product.name} />);
			lastCategory = product.category;
		})
		return (
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>{ rows }</tbody>
				</table>
			);
	}
}

class SearchBar extends React.Component {
	handleChange(){
		this.props.onUserInput(
				this.refs.filterTextInput.value,
				this.refs.inStockOnlyInput.checked
			);
	}
	render(){
		return (
				<form>
					<input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)} />
					<p>
						<input type="checkbox" checked={this.props.inStockOnly} ref="inStockOnlyInput" onChange={this.handleChange.bind(this)} />
						{` `}
						Only show products in stock
					</p>
				</form>
			);
	}
}

class FilterableProdcutTable extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			filterText: '',
			inStockOnly: false
		}
	}
	handleUserInput(filterText, inStockOnly){
		this.setState({
			filterText: filterText,
			inStockOnly: inStockOnly
		});
	}
	render(){
		return (
				<div>
					<SearchBar
						filterText={this.state.filterText}
						inStockOnly={this.state.inStockOnly}
						onUserInput={this.handleUserInput.bind(this)} />
					<ProdcutTable
						products={this.props.products}
						filterText={this.state.filterText}
						inStockOnly={this.state.inStockOnly} />
				</div>
			);
	}
}

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
		<FilterableProdcutTable products={PRODUCTS} />,
		document.getElementById('root')
	)

