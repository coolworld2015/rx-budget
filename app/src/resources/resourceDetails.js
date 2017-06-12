import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import Title from '../app/title';

class ResourceDetails extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			id: appConfig.resources.item.id,
			name: appConfig.resources.item.name,
			price: appConfig.resources.item.price,
			quantity: appConfig.resources.item.quantity,
			store: appConfig.resources.item.store,
			description: appConfig.resources.item.description,
			invalidValue: false
		}
		
    }
	
	componentDidMount() {
		if (!appConfig.resources.item.id) {
            hashHistory.push("/resources");
		} else {			
			this.refs.name.value = appConfig.resources.item.name;
			this.refs.price.value = appConfig.resources.item.price;
			this.refs.description.value = appConfig.resources.item.description;
		}
	}

    updateItem() {
        if (this.state.name == '' || this.state.name == undefined ||
            this.state.price == '' || this.state.price == undefined ||
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

        fetch(appConfig.url + 'api/goods/update', {
            method: 'post',
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                price: this.state.price,
                quantity: this.state.quantity,
                store: this.state.store,
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
					appConfig.resources.refresh = true;
					hashHistory.push("/resources");
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
		hashHistory.push("/resource-delete/" + this.state.id + "/" + this.state.name);
	}
	
	goBack() {
		hashHistory.push("/resources");
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
							ref="price"
							onChange={(event) => {
								this.setState({
									price: event.target.value,
								})
							}}
							placeholder="Price"/>
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

export default ResourceDetails;