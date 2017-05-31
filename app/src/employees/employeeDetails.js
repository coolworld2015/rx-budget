import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import Title from '../app/title';

class DepartmentDetails extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			id: appConfig.departments.item.id,
			name: appConfig.departments.item.name,
			phone: appConfig.departments.item.phone,
			address: appConfig.departments.item.address,
			sum: appConfig.departments.item.sum,
			sumShow: ((+appConfig.departments.item.sum).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 "),
			description: appConfig.departments.item.description,
			invalidValue: false
		}
		
    }
	
	componentDidMount() {
		if (!appConfig.departments.item.id) {
            hashHistory.push("/departments");
		} else {			
			this.refs.name.value = appConfig.departments.item.name;
			this.refs.phone.value = appConfig.departments.item.phone;
			this.refs.address.value = appConfig.departments.item.address;
			this.refs.sumShow.value = ((+appConfig.departments.item.sum).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
			this.refs.description.value = appConfig.departments.item.description;
		}
	}

    updateItem() {
        if (this.state.name == '' || this.state.name == undefined ||
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

        fetch(appConfig.url + 'api/departments/update', {
            method: 'post',
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
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
	
	goDelete() {
		hashHistory.push("/department-delete/" + this.state.id + "/" + this.state.name);
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

export default DepartmentDetails;