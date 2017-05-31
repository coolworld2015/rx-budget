import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import Title from '../app/title';

class EmployeeDelete extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			id: this.props.routeParams.id,
			name: this.props.routeParams.name,
			showProgress: false
		}
    }
	
    deleteItem() {
        this.setState({
            showProgress: true
        });

        fetch(appConfig.url + 'api/employees/delete', {
            method: 'post',
            body: JSON.stringify({
                id: this.props.routeParams.id,
				authorization: appConfig.access_token
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
				if (responseData.text) {
					appConfig.employees.refresh = true;
					hashHistory.push("/employees");
				} else {
					this.setState({
						serverError: true,
						showProgress: false
					});
				}
            })
            .catch((error)=> {
                this.setState({
                    serverError: true,
					showProgress: false
                });
            }) 
    }
	
	goBack() {
		hashHistory.push("/employees");
	}
	
    render() {
		var errorCtrl, loading;
		
        if (this.state.serverError) {
            errorCtrl = <div className="error">
				Something went wrong.
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
					Delete
				</div>
				<hr/>
				<br/>
 
				
				<div className="brandname">
					<br/>
						Are you sure you want to delete {this.props.routeParams.name}?
					<br/><br/>
				</div>
				
				{errorCtrl}
				{loading}
				
				<div className="showButtons1">
					<center>
					<br/>
					<hr/>
					<br/>
					<button className="button"
						onClick={this.deleteItem.bind(this)}>
						Delete
					</button>
	
					<button className="button"
						onClick={this.goBack.bind(this)}>
						Back
					</button>
					<br/>
					<br/>
					</center>
				</div>
				
				</center>				
			</div>		
        );
    }
}

export default EmployeeDelete;