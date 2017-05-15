import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import Title from '../app/title';

class UserDelete extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			id: this.props.routeParams.id,
			name: this.props.routeParams.name,
			showProgress: false
		}
		//console.log(this.props.routeParams);
    }
	
    deleteItem() {
        this.setState({
            showProgress: true
        });

        fetch(appConfig.url + 'api/users/delete', {
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
					appConfig.users.refresh = true;
					hashHistory.push("/users");
				} else {
					this.setState({
						badCredentials: true
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
	
	goUsers() {
		hashHistory.push("/users");
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
						onClick={this.goUsers.bind(this)}>
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

export default UserDelete;