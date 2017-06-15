import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import Title from '../app/title';

class InputAdd extends Component {
    constructor(props) {
        super(props);
		
		let d = new Date;
        let todayDate = d.getMonth() + 1 + '/' + (d.getDate()) + '/' + d.getFullYear();
		let time = d.toTimeString().split(' ');
		let date = todayDate + ' ' + time[0];
		
		this.state = {
			invalidValue: false,
			showProgress: true,
			projects: [],
			departments: [],
            employees: [],
			invoiceID: (appConfig.inputs.items.length + 1).toString(),
			date: date,
			id: +new Date,
			price: '0.00',
			total: '0.00'
		}
		
    }
	
	componentDidMount() {
		this.getProjects();
		this.getDepartments();
		this.getEmployees();
		this.getGoods();
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
				let options = [<option key='-1'>Select project</option>];
				
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
				let options = [<option key='-1'>Select department</option>];
				
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
				let options = [<option key='-1'>Select employee</option>];
				
				for (var i = 0; i < items.length; i++) {
					options.push(
						<option key={i} value={items[i].id}>{items[i].name}</option>
					);
				}
				this.setState({
					employees: options,
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
	
    getGoods() {		
        fetch(appConfig.url + 'api/goods/get', {			
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
				let options = [<option key='-1'>Select resource</option>];
				
				for (var i = 0; i < items.length; i++) {
					options.push(
						<option key={i} value={items[i].id}>{items[i].name}</option>
					);
				}
				this.setState({
					resources: items,
					goods: options,
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
	
    sort(a, b) {
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return -1
        }
        if (nameA > nameB) {
            return 1
        }
        return 0;
    }
	
	isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
	
    addItem() {
        if (this.state.projectID == undefined ||
            this.state.projectName == undefined ||
            this.state.employeeID == undefined ||
            this.state.employeeName == undefined ||
            this.state.departmentID == undefined ||
            this.state.departmentName == undefined ||
            this.state.productID == undefined ||
            this.state.productName == undefined ||

            this.state.invoiceID == undefined ||
            this.state.date == undefined ||
            this.state.quantity == undefined ||
            this.state.description == undefined ||
			
			this.isNumber(this.state.quantity) != true) {
            this.setState({
                invalidValue: true
            });
            return;
        }

        this.setState({
            showProgress: true
        });

        fetch(appConfig.url + 'api/inputs/add', {
            method: 'post',
            body: JSON.stringify({
                id: + new Date,
				invoiceID: this.state.invoiceID,
				date: this.state.date,
				price: this.state.price,				
				quantity: this.state.quantity,				
				description: this.state.description,
				total: this.state.total,
				
				projectID: this.state.projectID,
				project: this.state.projectName,
				employeeID: this.state.employeeID,
				employee: this.state.employeeName,
				departmentID: this.state.departmentID,
				department: this.state.departmentName,
				productID: this.state.productID,
				product: this.state.productName,

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
					New record
				</div>
				
				<div className="form">
					<div>
						<input type="text" 
							className="input"
							onChange={(event) => {
								this.setState({
									invoiceID: event.target.value,
									invalidValue: false
								})
							}}
							value={this.state.invoiceID}
							placeholder="ID"/>
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
							placeholder="Date"/>
					</div>
					
					<hr className="splitter" />
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
						<select className="input"
							onChange={(event) => {
								let arr = [].concat(this.state.resources);
 								let resource = arr.filter((el) => el.id == event.target.value);
								let price, total;
								console.log(resource)
								if (resource[0] === undefined) {
									price = '0.00',
									total = '0.00'
								} else {
									price = resource[0].price;
									total = ((+resource[0].price)*(+this.state.quantity)).toFixed(2).toString();
								}
								
								this.setState({
									productName: event.target.children[event.target.selectedIndex].label,
									productID: event.target.value,
									price: price,
									total: total,
									invalidValue: false
								})
							}}>
							{this.state.goods}
						</select>
					</div>
					
					<hr className="splitter" />
					<div>
						<input type="text" 
							className="input"
							value={this.state.price}
							placeholder="Price"/>
					</div>
					
					<hr className="splitter" />
					<div>
						<input type="text" 
							className="input"
							onChange={(event) => {
								this.setState({
									quantity: event.target.value,
									total: ((+this.state.price)*(+event.target.value)).toFixed(2).toString(),	
									invalidValue: false
								})
							}}
							placeholder="Quantity"/>
					</div>		
					
					<hr className="splitter" />
					<div>
						<textarea
							className="textarea"
							onChange={(event) => {
								this.setState({
									description: event.target.value,
									invalidValue: false
								})
							}}
							placeholder="Description">
						</textarea>
					</div>			
					
					<hr className="splitter" />
					<div>
						<input type="text" 
							className="input"
							value={this.state.total}
							placeholder="Total"/>
					</div>
				</div>
				
				{errorCtrl}
				{loading}
				
				<div>
					<br/>
					{validCtrl}
					
					<button onClick={this.addItem.bind(this)} className="button">
						Submit
					</button>					
 				
					<button onClick={this.goBack.bind(this)} className="button">
						Back
					</button>
				</div>		
				<br/>
				<br/>
				</center>				
			</div>
        );
    }
}

export default InputAdd;