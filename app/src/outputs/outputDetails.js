import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import Title from '../app/title';

class OutputDetails extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			invalidValue: false,
			id: appConfig.outputs.item.id,
			invoiceID: appConfig.outputs.item.invoiceID,
			date: appConfig.outputs.item.date,
			project: appConfig.outputs.item.project,
			projectID: appConfig.outputs.item.projectID,
			department: appConfig.outputs.item.department,
			departmentID: appConfig.outputs.item.departmentID,
			employee: appConfig.outputs.item.employee,
			employeeID: appConfig.outputs.item.employeeID,
			product: appConfig.outputs.item.product,
			productID: appConfig.outputs.item.productID,
			price: appConfig.outputs.item.price,
			quantity: appConfig.outputs.item.quantity,
			total: appConfig.outputs.item.total,
			description: appConfig.outputs.item.description
		}
    }
	
	componentDidMount() {
		if (!appConfig.outputs.item.id) {
            hashHistory.push("/outputs");
		} else {			
			this.refs.invoiceID.value = 'InvoiceID: ' + appConfig.outputs.item.invoiceID;
			this.refs.date.value = 'Date: ' + appConfig.outputs.item.date;
			this.refs.project.value = 'Project: ' + appConfig.outputs.item.project;
			//this.refs.projectID.value = 'Project: ' + appConfig.inputs.item.projectID;
			this.refs.department.value = 'Department: ' + appConfig.outputs.item.department;
			//this.refs.departmentID.value = 'Department: ' + appConfig.inputs.item.departmentID;
			this.refs.employee.value = 'Employee: ' + appConfig.outputs.item.employee;
			//this.refs.employeeID.value = 'Employee: ' + appConfig.inputs.item.employeeID;
			this.refs.product.value = 'Resourse: ' + appConfig.outputs.item.product;
			//this.refs.productID.value = 'Resourse: ' + appConfig.inputs.item.productID;
			this.refs.price.value = 'Price: ' + ((+appConfig.outputs.item.price).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
			this.refs.quantity.value = 'Quantity: ' + ((+appConfig.outputs.item.quantity).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
			this.refs.description.value = 'Description: ' + appConfig.outputs.item.description;
			this.refs.total.value = 'Total: ' + ((+appConfig.outputs.item.total).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
		}
	}

	goDelete() {
		hashHistory.push("/output-delete/" + this.state.id + "/" + this.state.invoiceID);
	}
	
	goBack() {
		hashHistory.push("/outputs");
	}
	
    render() {
        var errorCtrl, validCtrl, loading;

        if (this.state.serverError) {
            errorCtrl = <div className="error">
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
					{this.state.project}
				</div>
				
				<div className="form">
					<div>
						<input type="text" 
							className="input"
							ref="invoiceID"
							readOnly={true}
							placeholder="invoiceID"/>
					</div>
					
					<hr className="splitter" />						
					
					<div>
						<input type="text" 
							className="input"
							ref="date"
							readOnly={true}
							placeholder="date"/>
					</div>
					
					<hr className="splitter" />							
					
					<div>
						<input type="text" 
							className="input"
							ref="project"
							readOnly={true}
							placeholder="project"/>
					</div>
					
					<hr className="splitter" />					
					<div>
						<input type="text" 
							className="input"
							ref="department"
							readOnly={true}
							placeholder="department"/>
					</div>
					
					<hr className="splitter" />
					<div>
						<input type="text" 
							className="input"
							ref="employee"
							readOnly={true}
							placeholder="employee"/>
					</div>			
					
					<hr className="splitter" />
					<div>
						<input type="text" 
							className="input"
							ref="product"
							readOnly={true}
							placeholder="product"/>
					</div>		
					
					<hr className="splitter" />
					<div>
						<input type="text" 
							className="input"
							ref="price"
							readOnly={true}
							placeholder="price"/>
					</div>			
					
					<hr className="splitter" />
					<div>
						<input type="text" 
							className="input"
							ref="quantity"
							readOnly={true}
							placeholder="quantity"/>
					</div>
					
					<hr className="splitter" />
					<div>
						<input type="text" 
							className="input"
							ref="description"
							readOnly={true}
							placeholder="Description"/>
					</div>
 		
				
					<hr className="splitter" />
					<div>
						<input type="text" 
							className="input"
							ref="total"
							readOnly={true}
							placeholder="total"/>
					</div>
				</div>
				
				{errorCtrl}
				{loading}
				
				<div>
					<br/>
					{validCtrl}
					
					<button onClick={this.goBack.bind(this)} className="button">
						Submit
					</button>					
					
					<button onClick={this.goDelete.bind(this)} className="button">
						Delete
					</button>			
					<br/>					
					<br/>					
					<button onClick={this.goBack.bind(this)} className="button">
						Back
					</button>
				</div>		
				</center>				
			</div>
        );
    }
}

export default OutputDetails;