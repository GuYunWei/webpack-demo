import React, { Component } from 'react';
import { Link } from 'react-router';
import ajax from 'superagent';

export default class Detail extends Component {
	constructor(props){ 
		super(props);
		this.state = {
				mode: 'commits',
				commits: [],
				forks: [],
				pulls: [],
			};
	}
	componentWillMount(){ 
		this.fetchFeed('commits');
		this.fetchFeed('forks');
		this.fetchFeed('pulls');
	}
	saveFeed(type, contents){
		this.setState({ [type]: contents });
	}
	fetchFeed(type){
		if (this.props.params.repo === ''){ 
			return;
		}
		const baseURL = 'https://api.github.com/repos/facebook';
		ajax.get(`${baseURL}/${this.props.params.repo}/${type}`)
				.end((error, response) => { 
					if (!error && response){ 
						this.saveFeed(type, response.body);
					} else { 
						console.log(`Error fetching ${type}`, error);
					} 
				}
		);
	}
	selectMode(mode){ 
		this.setState({ mode });
	}
	renderCommits() { 
		return (<div>
				{this.state.commits.map((commit, index) => { 
					const author = commit.author ? commit.author.login : 'Anonymous';
					return (<p key={index} className="github">
								<Link to={`/user/${author}`}>{author}</Link>:
								<a href={commit.html_url}>{commit.commit.message}</a>
							</p>);
					})}
			</div>);
	}
	renderForks() { 
		return (<div>
				{this.state.forks.map((fork, index) => { 
					const owner = fork.owner ? fork.owner.login : 'Anonymous';
					return (<p key={index} className="github">
							<Link to={`/user/${owner}`}>{owner}</Link>: forked to
							<a href={fork.html_url}>{fork.html_url}</a> at { fork.created_at }
						</p>);
					})}
			</div>);
	}
	renderPulls() { 
		return (<div>
				{this.state.pulls.map((pull, index) => { 
					const user = pull.user ? pull.user.login : 'Anonymous';
					return (<p key={index} className="github">
							<Link to={`/user/${user}`}>{user}</Link>:
							<a href={pull.html_url}>{pull.body}</a>
						</p>);
					})}
			</div>);
	}
	render(){ 
		let content;
		if (this.state.mode === 'commits'){ 
			content = this.renderCommits();
		} else if (this.state.mode === 'forks'){ 
			content = this.renderForks();
		} else if (this.state.mode === 'pulls'){ 
			content = this.renderPulls();
		}
		return (<div>
				<p>You are here :<Link to="/" activeClassName="active">Home</Link>
				>{this.props.params.repo}</p>
				<button onClick={this.selectMode.bind(this, 'commits')} ref="commits">Show Commits</button>
				<button onClick={this.selectMode.bind(this, 'forks')} ref="forks">Show Forks</button>
				<button onClick={this.selectMode.bind(this, 'pulls')} ref="pulls">Show Pulls</button>
				{ content }
			</div>);
	}
}