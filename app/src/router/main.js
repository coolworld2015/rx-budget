'use strict';

import React, {Component} from 'react';
import {hashHistory} from 'react-router';

import Title from '../app/title';

class Main extends Component {
    constructor(props) {
        super(props);
    }	
	
	goAssets() {
		hashHistory.push("/assets");
	}
	
	goReports() {
		hashHistory.push("/reports");
	}
	
	goResources() {
		hashHistory.push("/resources");
	}	
	
	goInputs() {
		hashHistory.push("/inputs");
	}
	
	goOutputs() {
		hashHistory.push("/outputs");
	}
	
	goUsers() {
		hashHistory.push("/users");
	}	
	
	goProjects() {
		hashHistory.push("/projects");
	}
	
	goDepartments() {
		hashHistory.push("/departments");
	}
	
	goEmployees() {
		hashHistory.push("/employees");
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
					RX-Budget
				</div>

				<div>
					<hr/><br/>
					<div onClick={this.goAssets.bind(this)} className="items">Assets</div><br/>
					<div onClick={this.goReports.bind(this)} className="items">Reports</div><br/>
					<div onClick={this.goInputs.bind(this)} className="items">Inputs</div><br/>
					<div onClick={this.goOutputs.bind(this)} className="items">Outputs</div><br/>
					<div onClick={this.goResources.bind(this)} className="items">Resources</div><br/>
					<div onClick={this.goProjects.bind(this)} className="items">Projects</div><br/>
					<div onClick={this.goDepartments.bind(this)} className="items">Departments</div><br/>
					<div onClick={this.goEmployees.bind(this)} className="items">Employees</div><br/>
					<div onClick={this.goUsers.bind(this)} className="items">Users</div><br/>
					<div onClick={this.goAudit.bind(this)} className="items">Audit</div><br/>

					<div onClick={this.onLogOut.bind(this)} className="items">Logout</div>
					<br/><hr/>
				</div>
 
				</center>
			</div>
		)
    }
}
					/*  <div onClick={this.goTest.bind(this)} className="items">Test</div><br/>*/ 
export default Main;