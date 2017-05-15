import React, {Component} from 'react';
import {hashHistory} from 'react-router';

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
				height: 800 
			}}>
			
 
				<div>
					<center>
					Test 				
					<br/>
					<br/>
					<br/>
					<br/>
					<br/>

					<button className="button"
						onClick={this.goToMain.bind(this)}>
						Back
					</button>
					</center>
				</div>			
 

            </div>
        )
    }
}

export default Test;