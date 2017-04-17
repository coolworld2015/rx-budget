import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import Title from '../app/title';

class Search extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			invalidValue: false,
			type: 'Search by phone',
		}
		
		appConfig.search.refresh = true;
		appConfig.search.items = [];
    }
	
	goSearch() {
		if (this.state.name == '' || this.state.name == undefined) {
			this.setState({
				invalidValue: true
			});
			return;
		}

        this.setState({
            showProgress: true
        });
		
		hashHistory.push("/search-results/" + this.state.name + "/" + this.state.type);
	}
	
	goToMain() {
		hashHistory.push("/main");
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
					Search
				</div>
				
				<div className="form">
					<div>
						<select className="input"
							onChange={(event) => {
								this.setState({
									type: event.target.value,
									invalidValue: false
								})
							}}>
							<option value="Search by phone">Search by phone</option>
							<option value="Search by name">Search by name</option>
						</select>
					</div>					
					<hr className="splitter" />
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
							placeholder="Search"/>
					</div>
				</div>
				
				{errorCtrl}
				{loading}
				
				<div>
					<br/>
					{validCtrl}
					
					<button onClick={this.goSearch.bind(this)} className="button">
						Submit
					</button>					
 				
					<button onClick={this.goToMain.bind(this)} className="button">
						Back
					</button>
				</div>		
				</center>				
			</div>
        );
    }
}

export default Search;