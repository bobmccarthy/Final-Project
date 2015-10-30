var React = require('react');
var EachProductComponent = require('./EachProductComponent');

module.exports = React.createClass({
	getInitialState: function(){
		var x = this.props.model.get('products').split(',');
		x.shift();
		return{products: x}
	},
	render: function() {
		console.log(this.state.products);
		var each = this.state.products.map((list) => {
			return (
				<EachProductComponent model={list} />
			)
		})
		return (
			<div className="box-shadow--3dp each">
				<div className="eachList">
					<h2>{this.props.model.get('name')}</h2>
					{each}
				</div>
			</div>
		)
	}
	
});