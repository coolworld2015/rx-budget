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
					{this.props.item.invoiceID} - {this.props.item.project} - {(this.props.item.date).split(' ')[0]}<br/>
					{this.props.item.description}<br/> 
					Total: {((+this.props.item.total).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}
				</div>
			</div>
        );
    }
}

module.exports = ListItem;