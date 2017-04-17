import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import Title from '../app/title';

class AuditDetails extends Component {
    constructor(props) {
        super(props);
 
		this.state = {
			name: '',
			item: appConfig.audit.item
		}
		
		if (this.state.item.ip) {
			this.state = {
				item: appConfig.audit.item,
				ip: (appConfig.audit.item.ip).split('ff:')[1]
			}
		}
    }
	
	componentDidMount() {
		if (!appConfig.audit.item.id) {
            hashHistory.push("/audit");
		}
	}
	
	goPhones() {
		hashHistory.push("/audit");
	}
	
    render() {
        return (
			<div>
				<center>
					<div className="header">
						{this.state.item.date}
					</div>
					<br/>
					<br/>
					<div className="brandname">
						<hr/>
						User: {this.state.item.name} <br/>
						{this.state.item.date} <br/>
						IP: {this.state.ip} <br/>
						Description: {this.state.item.description} <br/>
						ID: {this.state.item.id} <br/>
						<hr/>
					</div>
					
					<div onClick={this.goPhones.bind(this)}>
						<br/>
						<button className="button">
							Back
						</button>
					</div>		
				</center>				
			</div>
        );
    }
}

export default AuditDetails;