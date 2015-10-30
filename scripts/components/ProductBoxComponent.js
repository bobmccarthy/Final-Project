var React = require('react');


module.exports = React.createClass({
	
	
	render: function() {
		
		return (
			<div className="col-xs-6 col-sm-4 col-md-3 xtraMargin">
				<div className="listItems box-shadow--6dp">
					<button onClick={this.itemAdded}>+</button>
					<img className="itemPic" src={this.props.model.get('urlPic')}/>
					<h4 className="productBox">{this.props.model.get('name')}</h4>
					<p>{this.props.model.get('price')}/{this.props.model.get('priceCategory')}</p>
					<p>{this.props.model.id}</p>
				</div>
			</div>
		)
	},
	itemAdded: function(){
		this.props.callback(this.props.model)
	}
	
});