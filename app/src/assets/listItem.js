import React, {Component} from 'react';

class ListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
			<div className="listItem">
				<div className="phone">
					{this.props.item.name} - {((+this.props.item.quantity).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}
				</div>
			</div>
        );
    }
}

module.exports = ListItem;