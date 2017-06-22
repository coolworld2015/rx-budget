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
				<div className="top">
					<div className="header">
						RX-Budget
					</div>
				</div>
				
				<div className="middle-menu">
					<hr/>
					<div onClick={this.goAssets.bind(this)} className="items-menu">Assets</div><hr/>
					<div onClick={this.goReports.bind(this)} className="items-menu">Reports</div><hr/>
					<div onClick={this.goInputs.bind(this)} className="items-menu">Inputs</div><hr/>
					<div onClick={this.goOutputs.bind(this)} className="items-menu">Outputs</div><hr/>
					<div onClick={this.goResources.bind(this)} className="items-menu">Resources</div><hr/>
					<div onClick={this.goProjects.bind(this)} className="items-menu">Projects</div><hr/>
					<div onClick={this.goDepartments.bind(this)} className="items-menu">Departments</div><hr/>
					<div onClick={this.goEmployees.bind(this)} className="items-menu">Employees</div><hr/>
					<div onClick={this.goUsers.bind(this)} className="items-menu">Users</div><hr/>
					<div onClick={this.goAudit.bind(this)} className="items-menu">Audit</div><hr/>

					<div onClick={this.onLogOut.bind(this)} className="items-menu">Logout</div> 
				</div>
				
				<div className="bottom-menu">
					<hr/>
				</div> 
				
			</div>
		)
    }
}
					/*  <div onClick={this.goTest.bind(this)} className="items">Test</div><br/>*/ 
export default Main;