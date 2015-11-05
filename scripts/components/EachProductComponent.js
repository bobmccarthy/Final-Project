var React = require('react');
var ProductModel = require('../models/ProductModel');
var productQuery = new Parse.Query(ProductModel);
var $ = require('jquery');




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
			});
		});
	},
	render: function() {
		var y = this.state.item.map((item)=>{
			return (
				<div className="listItemDeets row">
					<div className="col-xs-4">{item.get('name')}</div>
					<div className="col-xs-4">Qty:<input className="quantity" defaultValue='1' type="number"/></div>
					<div className="col-xs-4">${item.get('price')}</div>
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
