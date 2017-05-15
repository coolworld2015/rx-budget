import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import Title from '../app/title';

class UserAdd extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			invalidValue: false
		}
		
    }
	
	componentDidMount1() {
		if (appConfig.users.items.length < 1) {
            hashHistory.push("/users");
		} else {
			/*
			this.refs.username.value = appConfig.users.item.name;
			this.refs.password.value = appConfig.users.item.pass;
			this.refs.id.value = appConfig.users.item.id;
			this.refs.description.value = appConfig.users.item.description;
			*/
		}
	}

    addItem() {
        if (this.state.name == '' || this.state.name == undefined ||
            this.state.pass == '' || this.state.pass == undefined ||
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

        fetch(appConfig.url + 'api/users/add', {
            method: 'post',
            body: JSON.stringify({
                id: + new Date,
                name: this.state.name,
                pass: this.state.pass,
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
					appConfig.users.refresh = true;
					hashHistory.push("/users");
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
	
	goUsers() {
		hashHistory.push("/users");
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
							ref="username"
							onChange={(event) => {
								this.setState({
									name: event.target.value,
									invalidValue: false
								})
							}}
							placeholder="Login"/>
					</div>
					
					<hr className="splitter" />
					<div>
						<input type="text" 
							className="input"
							ref="password"
							onChange={(event) => {
								this.setState({
									pass: event.target.value,
									invalidValue: false
								})
							}}
							placeholder="Password"/>
					</div>		
					
					<hr className="splitter" />
					<div>
						<input type="text" 
							className="input"
							ref="description"
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
 				
					<button onClick={this.goUsers.bind(this)} className="button">
						Back
					</button>
				</div>		
				</center>				
			</div>
        );
    }
}

export default UserAdd;