var React = require('react');


module.exports = React.createClass({
	
	
	render: function() {
		return (
			<div className="col-xs-6 col-sm-4 col-md-3 xtraMargin">
				<div className="listItems box-shadow--6dp">
					<div id={'button'+this.props.model.id} className="button"><button className="box-shadow--2dp addToCart" onClick={this.itemAdded}><strong>+</strong> To Cart</button></div>
					<a href={'#details/'+this.props.model.id}><img className="itemPic" src={this.props.model.get('urlPic')}/>
					<h4 className="productBox">{this.props.model.get('name')}</h4>
					<p>${this.props.model.get('price')}/{this.props.model.get('priceCategory')}</p></a>
					
				</div>
			</div>
		)
	},
	itemAdded: function(){
		// console.log(this.props.model.get('objectId'));
		// $('#button'+this.props.model.get('objectId')).css('background-color', 'red');
		$('#button'+this.props.model.id).html('<img id="checkMark" src="../../images/check-mark.gif"/>');
		this.props.callback(this.props.model);
	}
	
});