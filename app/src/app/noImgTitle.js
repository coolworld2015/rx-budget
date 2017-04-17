'use strict';

import React, {Component} from 'react';
import {hashHistory} from 'react-router';

class NoImgTitle extends Component {
    constructor(props) {
        super(props);
    }
	
	goToMain() {
		hashHistory.push("/main");
	}
	
    render() {
        return (
            <div>
				<center>
				<div className="brandname">RX-Base</div>
				<div>
				{/*
					<br/>
					<img src="./logo.jpg" onClick={this.goToMain.bind(this)} className="logo"/>
					<hr/>
				*/}
				</div>
				</center>
            </div>
        )
    }
}

export default NoImgTitle;