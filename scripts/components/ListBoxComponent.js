var React = require('react');
window.$ = require('jquery');
window.jQuery = $;
var EachProductComponent = require('./EachProductComponent');


module.exports = React.createClass({
	getInitialState: function(){
		var x = this.props.model.get('products').split(',');
		x.shift();
		return{products: x}
	},
	render: function() {

		// console.log(this.state.products);
		var each = this.state.products.map((list) => {
			return (
				<EachProductComponent model={list} />
			)
		})
		return (
			<div className="box-shadow--3dp each">
				<div className="eachList">
					<button onClick={this.expand}>+</button>
					<h2>{this.props.model.get('name')}</h2>
					<h6>{this.props.model.get('createdAt').toString().substring(0,10)}</h6>
					<div>Total: $</div>
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