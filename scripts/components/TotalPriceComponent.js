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
		var total=0;
		var totalArray=[];
		var xx = this.state.items.map((itemName)=>{
			totalArray.push(itemName.get('theProducts').get('price'));

		})
		var totalNumbers=0;
		totalArray.length > 0 ? totalNumbers = totalArray.reduce(function(a,b) {return a + b;}) : '';

		return(
			<h3 className="totalListAmount">
				Total: ${totalNumbers.toFixed(2)}
			</h3>
			)
	
	}
	
});
