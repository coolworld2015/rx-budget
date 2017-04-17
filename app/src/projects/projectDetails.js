import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import Title from '../app/title';

class ProjectDetails extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			id: appConfig.projects.item.id,
			name: appConfig.projects.item.name,
			phone: appConfig.projects.item.phone,
			address: appConfig.projects.item.address,
			sum: appConfig.projects.item.sum,
			sumShow: ((+appConfig.projects.item.sum).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 "),
			description: appConfig.projects.item.description,
			invalidValue: false
		}
		
    }
	
	componentDidMount() {
		if (!appConfig.projects.item.id) {
            hashHistory.push("/projects");
		} else {			
			this.refs.name.value = appConfig.projects.item.name;
			this.refs.phone.value = appConfig.projects.item.phone;
			this.refs.address.value = appConfig.projects.item.address;
			this.refs.sumShow.value = ((+appConfig.projects.item.sum).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
			this.refs.description.value = appConfig.projects.item.description;
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

        fetch(appConfig.url + 'api/projects/update', {
            method: 'post',
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                phone: this.state.phone,
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
				if (responseData.pass) {
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
	
	goDelete() {
		hashHistory.push("/project-delete/" + this.state.id + "/" + this.state.name);
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

export default ProjectDetails;