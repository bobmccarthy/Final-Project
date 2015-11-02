var React = require('react');
var ProductModel = require('../models/ProductModel');
var productQuery = new Parse.Query(ProductModel);
var array1 = [];

module.exports = React.createClass({
	getInitialState: function(){
		return{
			product: this.props.model,
			item: []
		}
	},
	componentWillMount: function(){
		// console.log(this.state.product);
		productQuery.contains('objectId', this.state.product);
		productQuery.find().then((product) => {
			this.setState({
				item: product
			})
		});

	},
	render: function() {
		var y = this.state.item.map((item)=>{
			return (
				<div className="listItemDeets">
					<div>{item.get('name')}</div>
					<div>{item.get('price')}</div>
				</div>
				)
		})
		return (
			<div>
				{y}
			</div>
		)
	}
	
});
// <div>{this.props.model.get('name')}</div>
// 				<div>{this.props.model.get('price')}</div>