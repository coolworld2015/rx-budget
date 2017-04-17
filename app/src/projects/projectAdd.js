import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import Title from '../app/title';

class ProjectAdd extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			invalidValue: false
		}
    }
	
	componentDidMount() {
		if (appConfig.projects.items.length < 1) {
            hashHistory.push("/projects");
		}
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

        fetch(appConfig.url + 'api/projects/add', {
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
				if (responseData.name) {
					appConfig.projects.refresh = true;
					hashHistory.push("/projects");
				} else {
					this.setState({
						badCredentials: true
					});
				}
            })
            .catch((error)=> {
                this.setState({
                    serverError: true
                });
            }) 
    }
	
	goBack() {
		hashHistory.push("/projects");
	}
	
    render() {
        var errorCtrl, validCtrl, loading;

        if (this.state.serverError) {
            errorCtrl = <div className="valid">
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

export default ProjectAdd;