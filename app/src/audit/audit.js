import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import ListItem from './listItem';
import Title from '../app/title';

class Audit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showProgress: false,
            items: appConfig.audit.items.slice(0, 20),
			filteredItems: appConfig.audit.items,
			resultsCount: 0,
            recordsCount: 20,
            positionY: 0
        };
    }
	
	componentDidMount() {
		this.setState({
            resultsCount: appConfig.audit.items.length
        });
		
		if (appConfig.audit.refresh) {
            appConfig.audit.refresh = false;
			this.getItems();
		}
	}
	
	handleScroll() {
		var position = document.querySelector('.middle').scrollTop;
        var items, positionY, recordsCount;
        recordsCount = this.state.recordsCount;
        positionY = this.state.positionY;
		items = this.state.filteredItems.slice(0, recordsCount);
		
		if (position > positionY) {
			console.log(items.length);
			console.log(position);
            this.setState({
                items: items,
                recordsCount: recordsCount + 10,
                positionY: positionY + 500
            });
        }
	}

    onChangeText(e) {
		var text = e.target.value;
        var arr = [].concat(appConfig.audit.items);
        var items = arr.filter((el) => el.name.toLowerCase().indexOf(text.toLowerCase()) != -1);
        this.setState({
            items: items,
            resultsCount: items.length,
            filteredItems: items,
            searchQuery: text
        })
    }
		
	clearSearchQuery() {
		this.refs.search.value = '';
		this.setState({
			items: appConfig.audit.items.slice(0, 20),
            resultsCount: appConfig.audit.items.length,
            filteredItems: appConfig.audit.items,
			positionY: 0,
			recordsCount: 20
		});
	}
	
    getItems() {
		this.setState({
            showProgress: true
        });
		
        fetch(appConfig.url + 'api/audit/get', {			
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': appConfig.access_token
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
				appConfig.audit.items = responseData.sort(this.sort);
                this.setState({
                    items: (responseData.sort(this.sort)).slice(0, 20),
                    filteredItems: responseData.sort(this.sort),
                    resultsCount: appConfig.audit.items.length,
					showProgress: false
                });
            })
            .catch((error)=> {
                this.setState({
                    serverError: true,
					showProgress: false
                });
            })
    }
	
	sort(a, b) {
		var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
		if (nameA < nameB) {
			return -1
		}
		if (nameA > nameB) {
			return 1
		}
		return 0;
	};
		
    makeItems() {
        return this.state.items.map((item) => {
            return (
                <ListItem
                    key={item.id}
                    item={item}
                    clickHandle={this.clickHandle.bind(this)}/>
            )
        })
    }
	
    clickHandle(item) {
		appConfig.audit.item = {
			id: item.id,
			name: item.name,
			date: item.date,
			ip: item.ip,
			description: item.description
		};
        hashHistory.push("/audit-details/");
    }
	
	goToMain() {
		hashHistory.push("/main");
	}
	
    render() {
		var errorCtrl, loading;

        if (this.state.serverError) {
            errorCtrl = <div className="valid">
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
				<div className="top">
					<div className="header" onClick={this.clearSearchQuery.bind(this)}>
						Audit ({this.state.resultsCount})
					</div>
					
					<div>
						<input type="text" className="search"
							ref="search"
							onChange={this.onChangeText.bind(this)}
							placeholder="Search here"
						/>
					</div>
				</div>
				
				{loading}
				
				<div onScroll={this.handleScroll.bind(this)} 
					className="middle">
					{this.makeItems()}
				</div>
									
				<div className="bottom">
					<center>
					<hr/>
					{errorCtrl}
					<br/>
					<button className="button"
						onClick={this.goToMain.bind(this)}>
						Back
					</button>
					<br/>
					<br/>
					</center>
				</div>

            </div>
        )
    }
}

export default Audit;