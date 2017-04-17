import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import Title from '../app/title';

class PhoneDetails extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			item: appConfig.search.item 
		}
    }
	
	componentDidMount() {
		if (!appConfig.search.item.id) {
            hashHistory.push("/search");
		}
	}
	
	goPhones() {
		hashHistory.goBack();
	}
	
    render() {
        return (
			<div>
				<center>
				<div className="brandname">
					<hr/>
					{this.state.item.name} <br/>
					{this.state.item.phone} <br/>
					{this.state.item.street} <br/>
					House: {this.state.item.house} <br/>
					Apt: {this.state.item.apt} <br/>
					Index: {this.state.item.index} <br/>
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

export default PhoneDetails;