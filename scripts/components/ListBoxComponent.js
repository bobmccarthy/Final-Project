var React = require('react');
window.$ = require('jquery');
window.jQuery = $;
var ProductModel = require('../models/ProductModel');
var EachProductComponent = require('./EachProductComponent');
var productQuery = new Parse.Query(ProductModel);




module.exports = React.createClass({
	getInitialState: function(){
		var x = this.props.model.get('products').split(',');
		x.shift();
		return{
			products: x,
			priceTotal: 0
		}
	},
	componentWillMount: function(){
		productQuery.containedIn('objectId', this.state.products).find((stuff)=>{
			stuff.map((stuffy)=>{
				this.setState({priceTotal: this.state.priceTotal+stuffy.get('price')});
			})
		})
			
	},
	render: function() {

		
		var each = this.state.products.map((list) => {
			
			return (
				<EachProductComponent model={list} />
			)
		})
		return (
			<div className="box-shadow--3dp each">
				<div className="eachList">
					<button onClick={this.expand}>See List</button>
					<h2>{this.props.model.get('name')}</h2>
					<h6>{this.props.model.get('createdAt').toString().substring(0,10)}</h6>
					<h3>Total: ${this.state.priceTotal.toFixed(2)}</h3>
					<section className="toggler" id={this.props.id}>
						{each}
					</section>
				</div>
			</div>
		);
		
	},
	expand: function () {
		$('#'+this.props.id).toggle('slow');
	}
	
	
});