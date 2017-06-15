import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import Title from '../app/title';

class InputDetails extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			invalidValue: false,
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
			description: appConfig.inputs.item.description
		}
		
    }
	
	componentDidMount() {
		if (!appConfig.inputs.item.id) {
            hashHistory.push("/inputs");
		} else {			
			this.refs.invoiceID.value = 'InvoiceID: ' + appConfig.inputs.item.invoiceID;
			this.refs.date.value = 'Date: ' + appConfig.inputs.item.date;
			this.refs.project.value = 'Project: ' + appConfig.inputs.item.project;
			//this.refs.projectID.value = 'Project: ' + appConfig.inputs.item.projectID;
			this.refs.department.value = 'Department: ' + appConfig.inputs.item.department;
			//this.refs.departmentID.value = 'Department: ' + appConfig.inputs.item.departmentID;
			this.refs.employee.value = 'Employee: ' + appConfig.inputs.item.employee;
			//this.refs.employeeID.value = 'Employee: ' + appConfig.inputs.item.employeeID;
			this.refs.product.value = 'Resourse: ' + appConfig.inputs.item.product;
			//this.refs.productID.value = 'Resourse: ' + appConfig.inputs.item.productID;
			this.refs.price.value = 'Price: ' + ((+appConfig.inputs.item.price).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
			this.refs.quantity.value = 'Quantity: ' + ((+appConfig.inputs.item.quantity).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
			this.refs.description.value = 'Description: ' + appConfig.inputs.item.description;
			this.refs.total.value = 'Total: ' + ((+appConfig.inputs.item.total).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
		}
	}

	goDelete() {
		hashHistory.push("/input-delete/" + this.state.id + "/" + this.state.invoiceID);
	}
	
	goBack() {
		hashHistory.push("/inputs");
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

export default InputDetails;