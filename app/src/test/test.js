import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import * as bs from 'react-bootstrap';

class Test extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showProgress: false,
        };
    }
	
	goToMain() {
		hashHistory.push("/main");
	}
	
    render() {
        return (			
            <div style={{
				backgroundColor: 'white',
				height: 8000,
				textAlign: 'center'
			}}>			
 
				<div style={{
					marginBottom: 200
				}}>
					Test 				
				</div>	
				
				<div>	
					<bs.Button bsStyle="primary"
						onClick={this.goToMain.bind(this)}>
						Back
					</bs.Button>
				</div>			
 
            </div>
        )
    }
}

export default Test;