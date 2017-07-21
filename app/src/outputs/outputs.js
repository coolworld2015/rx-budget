import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import ListItem from './listItem';

class Outputs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showProgress: false,
            items: appConfig.outputs.items.slice(0, 20),
			filteredItems: appConfig.employees.items,
			resultsCount: 0,
            recordsCount: 20,
            positionY: 0
        };
    }
	
	componentDidMount() {
		this.setState({
            resultsCount: appConfig.outputs.items.length
        });
		
		if (appConfig.outputs.refresh) {
            appConfig.outputs.refresh = false;
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
        var arr = [].concat(appConfig.outputs.items);
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
			items: appConfig.outputs.items.slice(0, 20),
            resultsCount: appConfig.outputs.items.length,
            filteredItems: appConfig.outputs.items,
			positionY: 0,
			recordsCount: 20
		});
	}
	
    getItems() {
		this.setState({
            showProgress: true
        });
		
        fetch(appConfig.url + 'api/outputs/get', {			
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': appConfig.access_token
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
				appConfig.outputs.items = responseData.sort(this.sort);
                this.setState({
                    items: (responseData.sort(this.sort)).slice(0, 20),
                    filteredItems: responseData.sort(this.sort),
                    resultsCount: appConfig.outputs.items.length,
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
        var nameA = +a.invoiceID.toLowerCase(), nameB = +b.invoiceID.toLowerCase();
        if (nameA < nameB) {
            return 1
        }
        if (nameA > nameB) {
            return -1
        }
        return 0;
    }
		
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
		appConfig.outputs.item = {
			id: item.id,
			invoiceID: item.invoiceID,
			date: item.date,
			project: item.project,
			projectID: item.projectID,			
			department: item.department,
			departmentID: item.departmentID,			
			employee: item.employee,
			employeeID: item.employeeID,
			product: item.product,
			productID: item.productID,
			price: item.price,
			quantity: item.quantity,
			total: item.total,
			description: item.description
		};
        hashHistory.push("/output-details/");
    }
    
	goAdd() {
        hashHistory.push("/output-add/");
    }
	
	goToMain() {
		hashHistory.push("/main");
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
				<div className="top">
					<div className="header" onClick={this.clearSearchQuery.bind(this)}>
						Outputs ({this.state.resultsCount})
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
						onClick={this.goAdd.bind(this)}>
						Add
					</button>
	
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

export default Outputs;