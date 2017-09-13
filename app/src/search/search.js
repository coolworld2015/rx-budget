import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import Title from '../app/title';

class Search extends Component {
    constructor(props) {
        super(props);
		
		let d = new Date;
        let todayDate = d.getMonth() + 1 + '/' + (d.getDate()) + '/' + d.getFullYear();
		let time = d.toTimeString().split(' ');
		let date = todayDate;
		
		this.state = {
			invalidValue: false,
			type: 'Search by phone',
			projects: [],
			departments: [],
            employees: [],
			date: date,
			start: '01/01/2017'
		}
		
		appConfig.search.refresh = true;
		appConfig.search.items = [];
    }
	
	componentDidMount() {
		this.getProjects();
		this.getDepartments();
		this.getEmployees();
	}
	
    getProjects() {		
        fetch(appConfig.url + 'api/projects/get', {			
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': appConfig.access_token
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {				
				let items = responseData.sort(this.sort);
				let options = [<option key='-1'>All projects</option>];
				
				for (var i = 0; i < items.length; i++) {
					options.push(
						<option key={i} value={items[i].id}>{items[i].name}</option>
					);
				}
				this.setState({
					projects: options,
					showProgress: false
				});
            })
            .catch((error)=> {
                this.setState({
                    serverError: true,
					showProgress: false
                });
            })
    }
	
    getDepartments() {		
        fetch(appConfig.url + 'api/departments/get', {			
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': appConfig.access_token
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {				
				let items = responseData.sort(this.sort);
				let options = [<option key='-1'>All departments</option>];
				
				for (var i = 0; i < items.length; i++) {
					options.push(
						<option key={i} value={items[i].id}>{items[i].name}</option>
					);
				}
				this.setState({
					departments: options,
					showProgress: false
				});
            })
            .catch((error)=> {
                this.setState({
                    serverError: true,
					showProgress: false
                });
            })
    }	
	
    getEmployees() {		
        fetch(appConfig.url + 'api/employees/get', {			
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': appConfig.access_token
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {				
				let items = responseData.sort(this.sort);
				let options = [<option key='-1'>All employees</option>];
				
				for (var i = 0; i < items.length; i++) {
					options.push(
						<option key={i} value={items[i].id}>{items[i].name}</option>
					);
				}

				this.setState({
					employees: options,
					arrEmployees: items,
					showProgress: false
				});
            })
            .catch((error)=> {
                this.setState({
                    serverError: true,
					showProgress: false
                });
            })
    }
	
	goSearch() {
		if (this.state.projectName == '' || this.state.projectName == undefined) {
			this.setState({
				invalidValue: true
			});
			return;
		}

        this.setState({
            showProgress: true
        });
		
		hashHistory.push("/search-results/" + this.state.projectName + "/" + this.state.type);
	}
	
	goToMain() {
		hashHistory.push("/main");
	}
	
    render() {
        var errorCtrl, validCtrl, loading;

        if (this.state.serverError) {
            errorCtrl = <div className="valid">
				Something went wrong.
			</div>;
        }
		
        if (this.state.invalidValue) {
            validCtrl = <div className="valid">
				Value required - please provide.
				<br/><br/>
			</div>;
        }
				
        if (this.state.showProgress) {
            loading = <div className="loading">
                <span>Loading...</span>
            </div>;
        }
		
        return (
			<div>				
				<center>		
                <div className="header">
					Reports
				</div>
				
				<div className="form">
					<div>
						<select className="input"
							onChange={(event) => {
								this.setState({
									projectName: event.target.children[event.target.selectedIndex].label,
									projectID: event.target.value,
									invalidValue: false
								})
							}}>
							{this.state.projects}
						</select>
					</div>
					
					<hr className="splitter" />					
					<div>
						<select className="input"
							onChange={(event) => {
								this.setState({
									departmentName: event.target.children[event.target.selectedIndex].label,
									departmentID: event.target.value,
									invalidValue: false
								})
							}}>
							{this.state.departments}
						</select>
					</div>				
					
					<hr className="splitter" />					
					<div>
						<select className="input"
							onChange={(event) => {
								this.setState({
									employeeName: event.target.children[event.target.selectedIndex].label,
									employeeID: event.target.value,
									invalidValue: false
								})
							}}>
							{this.state.employees}
						</select>
					</div>
					
					<hr className="splitter" />					
					<div>
						<input type="text" 
							className="input"
							onChange={(event) => {
								this.setState({
									start: event.target.value,
									invalidValue: false
								})
							}}
							value={this.state.start}
							placeholder="Start"/>
					</div>
					
					<hr className="splitter" />					
					<div>
						<input type="text" 
							className="input"
							onChange={(event) => {
								this.setState({
									date: event.target.value,
									invalidValue: false
								})
							}}
							value={this.state.date}
							placeholder="End"/>
					</div>
				</div>
				
				{errorCtrl}
				{loading}
				
				<div>
					<br/>
					{validCtrl}
					
					<button onClick={this.goSearch.bind(this)} className="button">
						Submit
					</button>					
 				
					<button onClick={this.goToMain.bind(this)} className="button">
						Back
					</button>
				</div>		
				</center>				
			</div>
        );
    }
}

export default Search;