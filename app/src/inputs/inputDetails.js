import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import Title from '../app/title';

class InputDetails extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			id: appConfig.inputs.item.id,
			name: appConfig.inputs.item.name,
			department: appConfig.inputs.item.department,
			departmentID: appConfig.inputs.item.departmentID,
			phone: appConfig.inputs.item.phone,
			address: appConfig.inputs.item.address,
			sum: appConfig.inputs.item.sum,
			sumShow: ((+appConfig.inputs.item.sum).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 "),
			description: appConfig.inputs.item.description,
			invalidValue: false
		}
		
    }
	
	componentDidMount() {
		if (!appConfig.inputs.item.id) {
            hashHistory.push("/inputs");
		} else {			
			this.refs.name.value = appConfig.inputs.item.name;
			this.refs.department.value = appConfig.inputs.item.department;
			this.refs.phone.value = appConfig.inputs.item.phone;
			this.refs.address.value = appConfig.inputs.item.address;
			this.refs.sumShow.value = ((+appConfig.inputs.item.sum).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
			this.refs.description.value = appConfig.inputs.item.description;
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

        fetch(appConfig.url + 'api/inputs/update', {
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
					appConfig.inputs.refresh = true;
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
	
	goDelete() {
		hashHistory.push("/input-delete/" + this.state.id + "/" + this.state.name);
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

export default InputDetails;