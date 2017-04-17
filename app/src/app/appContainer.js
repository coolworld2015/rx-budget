import React, {Component} from 'react';
import {Router, hashHistory} from 'react-router';
import {render} from 'react-dom';
import routes from '../router/routes';

class AppContainer extends Component {
	constructor(props) {
		super(props);
		
        this.state = {
            access_token: window.appConfig.access_token
        }
	}

	render() {
		return (
			<Router history={hashHistory} routes={routes}/>
		);	
	}
}

export default AppContainer;