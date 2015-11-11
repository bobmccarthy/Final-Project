var React = require('react');


module.exports = React.createClass({
	render: function() {
		

		return (
			<div className="singleProduct">
				
				<img className="largeImg" src={this.props.model.get('urlPic')}/>
				<h2>{this.props.model.get('name')}</h2>
				<h4>${this.props.model.get('price').toFixed(2)}/{this.props.model.get('priceCategory')}</h4>
				<p className="ingredientsP" >Ingredients:</p>
				<p>{this.props.model.get('ingredients')}</p>
				<button className="box-shadow--2dp back" onClick={this.back}>Back to Search</button>
				
				
			</div>
		)
	},
	back: function(){
		// this.props.router.navigate('#productSearch', {trigger: true});
		window.history.back();
	}
});