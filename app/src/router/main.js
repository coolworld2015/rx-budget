'use strict';

import React, {Component} from 'react';
import {hashHistory} from 'react-router';

import Title from '../app/title';

class Main extends Component {
    constructor(props) {
        super(props);
    }	
	
	goUsers() {
		hashHistory.push("/users");
	}	
	
	goProjects() {
		hashHistory.push("/projects");
	}
	
	goAudit() {
		hashHistory.push("/audit");
	}
	
	goTest() {
		hashHistory.push("/test");
	}
	
	onLogOut() {
        appConfig.onLogOut();
    }
	
    render() {
		return (
			<div>
				<center>
				<div className="header">
					Main
				</div>

				<div>
					<hr/><br/>
					<div onClick={this.goProjects.bind(this)} className="items">Projects</div><br/>
					<div onClick={this.goUsers.bind(this)} className="items">Users</div><br/>
					<div onClick={this.goAudit.bind(this)} className="items">Audit</div><br/>
					<div onClick={this.goTest.bind(this)} className="items">Test</div><br/>
					<div onClick={this.onLogOut.bind(this)} className="items">Logout</div>
					<br/><hr/>
				</div>
 
				</center>
			</div>
		)
    }
}

export default Main;