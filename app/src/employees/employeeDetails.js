import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import Title from '../app/title';

class EmployeeDetails extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			id: appConfig.employees.item.id,
			name: appConfig.employees.item.name,
			department: appConfig.employees.item.department,
			departmentID: appConfig.employees.item.departmentID,
			phone: appConfig.employees.item.phone,
			address: appConfig.employees.item.address,
			sum: appConfig.employees.item.sum,
			sumShow: ((+appConfig.employees.item.sum).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 "),
			description: appConfig.employees.item.description,
			invalidValue: false
		}
		
    }
	
	componentDidMount() {
		if (!appConfig.employees.item.id) {
            hashHistory.push("/employees");
		} else {			
			this.refs.name.value = appConfig.employees.item.name;
			this.refs.department.value = appConfig.employees.item.department;
			this.refs.phone.value = appConfig.employees.item.phone;
			this.refs.address.value = appConfig.employees.item.address;
			this.refs.sumShow.value = ((+appConfig.employees.item.sum).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
			this.refs.description.value = appConfig.employees.item.description;
		}
	}

    updateItem() {
        if (this.state.name == '' || this.state.name == undefined ||
			this.state.departmentID == undefined ||
            this.state.phone == '' || this.state.phone == undefined ||
            this.state.description == '' || 
			this.state.description == undefined) {
            this.setState({
                invalidValue: true
            });
            return;
        }

        this.setState({
            showProgress: true
        });

        fetch(appConfig.url + 'api/employees/update', {
            method: 'post',
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
				department: this.state.department,
				departmentID: this.state.departmentID,
                phone: this.state.phone,
                address: this.state.address,
                sum: this.state.sum,
                description: this.state.description,
				authorization: appConfig.access_token
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
				if (responseData.id) {
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
	
	goDelete() {
		hashHistory.push("/employee-delete/" + this.state.id + "/" + this.state.name);
	}
	
	goBack() {
		hashHistory.push("/employees");
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
					{this.state.name}
				</div>
				
				<div className="form">
					<div>
						<input type="text" 
							className="input"
							ref="name"
							onChange={(event) => {
								this.setState({
									name: event.target.value,
								})
							}}
							placeholder="Name"/>
					</div>
					
					<hr className="splitter" />					
					<div>
						<input type="text" 
							className="input"
							ref="department"
							placeholder="Name"/>
					</div>
					
					<hr className="splitter" />
					<div>
						<input type="text" 
							className="input"
							ref="phone"
							onChange={(event) => {
								this.setState({
									phone: event.target.value,
								})
							}}
							placeholder="Phone"/>
					</div>
					
					<hr className="splitter" />
					<div>
						<input type="text" 
							className="input"
							ref="address"
							onChange={(event) => {
								this.setState({
									address: event.target.value,
								})
							}}
							placeholder="Address"/>
					</div>		
					
					<hr className="splitter" />
					<div>
						<input type="text" 
							className="input"
							ref="description"
							onChange={(event) => {
								this.setState({
									description: event.target.value,
								})
							}}
							placeholder="Description"/>
					</div>
 		
				
					<hr className="splitter" />
					<div>
						<input type="text" 
							className="input"
							readOnly={true}
							ref="sumShow"
							placeholder="Description"/>
					</div>
				</div>
				
				{errorCtrl}
				{loading}
				
				<div>
					<br/>
					{validCtrl}
					
					<button onClick={this.updateItem.bind(this)} className="button">
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

export default EmployeeDetails;