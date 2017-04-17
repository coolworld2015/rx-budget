import React, {Component} from 'react';
import Header from './Header';

class Root extends Component {
    constructor(props) {
        super(props);
    }
	
    render() {
		return (
			<div>
				{this.props.children}
			</div>
		)
    }
}

export default Root;