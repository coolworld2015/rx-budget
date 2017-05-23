import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import Title from '../app/title';

class DepartmentAdd extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			invalidValue: false,
			showProgress: true,
			items: [],
			options: []
		}
		this.getItems();
    }
	
	componentDidMount1() {
		if (appConfig.departments.items.length < 1) {
            hashHistory.push("/departments");
		}
	}
	
    getItems() {		
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
				let options = [];
				
				for (var i = 0; i < items.length; i++) {
					options.push(
						<option key={i} value={items[i].id}>{items[i].name}</option>
					);
				}
				this.setState({
					options: options,
					showProgress: false
				});
            })
            .catch((error)=> {
				console.log(error)
                this.setState({
                    serverError: true,
					showProgress: false
                });
            })
    }
	
    addItem() {
        if (this.state.name == '' || this.state.name == undefined ||
            this.state.phone == '' || this.state.phone == undefined ||
            this.state.address == '' || this.state.address == undefined ||
            this.state.description == '' || this.state.description == undefined) {
            this.setState({
                invalidValue: true
            });
            return;
        }

        this.setState({
            showProgress: true
        });

        fetch(appConfig.url + 'api/departments/add', {
            method: 'post',
            body: JSON.stringify({
                id: + new Date,
                name: this.state.name,
				phone: this.state.phone,
				address: this.state.address,
				sum: 0,
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
					appConfig.departments.refresh = true;
					hashHistory.push("/departments");
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
		hashHistory.push("/departments");
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
						<select className="input">
							{this.state.options}
						</select>
					</div>
					
					<hr className="splitter" />
					<div>
						<input type="text" 
							className="input"
							onChange={(event) => {
								this.setState({
									name: event.target.value,
									invalidValue: false
								})
							}}
							placeholder="Name"/>
					</div>
					
					<hr className="splitter" />
					<div>
						<input type="text" 
							className="input"
							onChange={(event) => {
								this.setState({
									phone: event.target.value,
									invalidValue: false
								})
							}}
							placeholder="Phone"/>
					</div>		
					
					<hr className="splitter" />
					<div>
						<input type="text" 
							className="input"
							onChange={(event) => {
								this.setState({
									address: event.target.value,
									invalidValue: false
								})
							}}
							placeholder="Address"/>
					</div>
					
					<hr className="splitter" />
					<div>
						<input type="text" 
							className="input"
							onChange={(event) => {
								this.setState({
									description: event.target.value,
									invalidValue: false
								})
							}}
							placeholder="Description"/>
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
				</center>				
			</div>
        );
    }
}

export default DepartmentAdd;