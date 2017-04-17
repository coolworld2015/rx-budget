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
					{this.props.item.name} - {this.props.item.phone}
				</div>
			</div>
        );
    }
}

module.exports = ListItem;