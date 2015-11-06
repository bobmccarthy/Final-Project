var React = require('react');
var ProductModel = require('../models/ProductModel');
var productQuery = new Parse.Query(ProductModel);
var SingleProductBoxComponent = require('./SingleProductBoxComponent');


module.exports = React.createClass({
	getInitialState: function(){
		return{
			itemId: this.props.itemId,
			item: []
		}
	},
	componentWillMount: function(){
		productQuery.equalTo('objectId', this.state.itemId);
		productQuery.find().then((product) => {
			this.setState({item: product});
		});
	},
	
	render: function() {

		var singleProduct = this.state.item.map((product) => {
			return (
				<SingleProductBoxComponent key={product.id} model={product} />
			);
		})
		return (
			<div className="container-fluid">
				{singleProduct}
			</div>
		)

	}
	
});