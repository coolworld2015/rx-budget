import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import Title from '../app/title';

class InputDelete extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			showProgress: false,
			id: appConfig.inputs.item.id,
			invoiceID: appConfig.inputs.item.invoiceID,
			date: appConfig.inputs.item.date,
			project: appConfig.inputs.item.project,
			projectID: appConfig.inputs.item.projectID,
			department: appConfig.inputs.item.department,
			departmentID: appConfig.inputs.item.departmentID,
			employee: appConfig.inputs.item.employee,
			employeeID: appConfig.inputs.item.employeeID,
			product: appConfig.inputs.item.product,
			productID: appConfig.inputs.item.productID,
			price: appConfig.inputs.item.price,
			quantity: appConfig.inputs.item.quantity,
			total: appConfig.inputs.item.total,
			description: appConfig.inputs.item.description
		}
    }
	
    deleteItem() {
        this.setState({
            showProgress: true
        });
console.log(this.state.total)
        fetch(appConfig.url + 'api/inputs/delete', {
            method: 'post',
            body: JSON.stringify({
                id: this.state.id,
				date: this.state.date,
				department: this.state.department,
				departmentID: this.state.departmentID,
				description: this.state.description,
				employee: this.state.employee,
				employeeID: this.state.employeeID,
				invoiceID: this.state.invoiceID,
				price: this.state.price,
				product: this.state.product,
				productID: this.state.productID,
				project: this.state.project,
				projectID: this.state.projectID,
				quantity: this.state.quantity,
				total: this.state.total,
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
					appConfig.inputs.refresh = true;
					appConfig.assets.refresh = true;
					appConfig.projects.refresh = true;
					appConfig.departments.refresh = true;
					appConfig.employees.refresh = true;
					hashHistory.push("/inputs");
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
		hashHistory.push("/inputs");
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

export default InputDelete;