import React, {Component} from 'react';
import AppContainer from './appContainer';
import Login from './Login';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showProgress: false,
            isLoggedIn: false
        }
		
		window.appConfig = {
            access_token: '',
			url: 'http://jwt-budget.herokuapp.com/',
			onLogOut: this.onLogOut.bind(this),			
			users: {
                refresh: true,
				items: [],
				item: {}
            },
			audit: {
				refresh: true,
				items: [],
				item: {}
            },
			assets: {
				refresh: true,
				items: [],
				item: {}
            },			
			resources: {
				refresh: true,
				items: [],
				item: {}
            },
			projects: {
                refresh: true,
				items: [],
				item: {}
            },
			departments: {
                refresh: true,
				items: [],
				item: {}
            },
			employees: {
                refresh: true,
				items: [],
				item: {}
            },
			inputs: {
                refresh: true,
				items: [],
				item: {}
            },
			outputs: {
                refresh: true,
				items: [],
				item: {}
            },
			search: {
                refresh: true,
				items: [],
				item: {}
            }
        };
    }

    onLogin() {
        console.log('onLogin');
        this.setState({isLoggedIn: true});
    }
    
	onLogOut() {
        console.log('onLogOut');
        this.setState({isLoggedIn: false});
    }
	
    render() {
        if (this.state.isLoggedIn) {
            return (
				<AppContainer />
            )
        } else {
            return (
                <Login onLogin={this.onLogin.bind(this)}/>
            )
        }
    }
}

export default App;