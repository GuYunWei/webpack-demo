import React from 'react';
import ajax from 'superagent';
import { IndexLink, Link } from "react-router";

export default class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events: []
		}
	}

	componentWillMount() {
		ajax.get(`https://api.github.com/users/${this.props.params.user}/events`)
			.end((error, response)=>{
				if(!error && response){
					this.setState({events: response.body});
				}else{
					console.log(`Error fetching user data`, error);
				}
			});
	}

	render() {
		return (
			<div>
				<p>You are here :<Link to="/" activeClassName="active">Home</Link>>{this.props.params.user}</p>
				<ul>
					{this.state.events.map((event, index)=>{
						const eventType = event.type;
						const repoName = event.repo.name;
						const creationDate = event.created_at;

						return (
								<li key={index}>
									<strong>{repoName}</strong>: {eventType}
									at {creationDate}
								</li>
							)
					})}
				</ul>
			</div>
		);
	}
}