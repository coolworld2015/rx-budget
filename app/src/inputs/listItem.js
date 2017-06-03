import React, {Component} from 'react';

class ListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    clickOnItem() {
        this.props.clickHandle(this.props.item);
    }

    render() {
        return (
			<div className="listItem">
				<div className="phone" onClick={this.clickOnItem.bind(this)}>
					{this.props.item.name} - {this.props.item.department}<br/> 
					Total: {((+this.props.item.sum).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}
				</div>
			</div>
        );
    }
}

module.exports = ListItem;