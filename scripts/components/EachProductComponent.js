var React = require('react');
var $ = require('jquery');
var ProductModel = require('../models/ProductModel');
var productQuery = new Parse.Query(ProductModel);
var ListProductsModel = require('../models/ListProductsModel');



module.exports = React.createClass({
	getInitialState: function(){
		return{
			listObject: this.props.model,
			items: [],
			prices: []
		}
	},
	componentWillMount: function(){

		this.setState({listObject: this.props.model})
		var listProductsQuery = new Parse.Query(ListProductsModel);
		listProductsQuery.equalTo('theList', this.state.listObject);
		listProductsQuery.include('theProducts')
		.find().then((lists) => {
			this.setState({items: lists});
		});
	},
	render: function() {

		var z = this.state.items.map((itemName)=>{
			
			return(
			<div className="row listBoxProducts">
				<div className="col-xs-4"><h4>{itemName.get('theProducts').get('name')}</h4></div>
				<div className="col-xs-1"><h4>Qty: </h4></div>
				<div className="col-xs-3"><h4><input defaultValue="1" type="number"/></h4></div>
				<div className="col-xs-4"><h4>${itemName.get('theProducts').get('price').toFixed(2)}</h4></div>
			</div>
			)
			
		})
			
		return(
			<div className="container-fluid">
				
				{z}
				
			</div>
			)
	
	}
	
});
