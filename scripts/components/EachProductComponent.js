var React = require('react');
var $ = require('jquery');
var ProductModel = require('../models/ProductModel');
var productQuery = new Parse.Query(ProductModel);
var ListProductsModel = require('../models/ListProductsModel');
var oneItem=(<div>loading...</div>)
var counter=1;
var itemy = [];




module.exports = React.createClass({
	getInitialState: function(){
		return{
			listObject: this.props.model,
			items: [],
			prices: []
		}
	},
	componentWillMount: function(){
		itemy=[];
		this.setState({listObject: this.props.model})
		var listProductsQuery = new Parse.Query(ListProductsModel);
		listProductsQuery.equalTo('theList', this.state.listObject);
		listProductsQuery.include('theProducts')
		.find().then((lists) => {
			this.setState({items: lists});
			// for (var i = 0; i<lists.length; i++){
			// 	this.setState({
			// 		items: (this.state.items+lists[i].get('theProducts').get('name')+',').split(','),
			// 		prices: (this.state.prices+lists[i].get('theProducts').get('price')+',').split(',')
			// 	})
			// }
			
			});
	},
	render: function() {
		var count = 0;
		// console.log(this.state.items);
		// console.log(this.state.prices);
		// console.log(this.state.prices[0]);
		var z = this.state.items.map((itemName)=>{
			// console.log(itemName.get('theProducts').get('price'));
			
			return(
			<div className="row listBoxProducts">
				<div className="col-xs-4"><h3>{itemName.get('theProducts').get('name')}</h3></div>
				<div className="col-xs-1"><h3>Qty: </h3></div>
				<div className="col-xs-3"><h3><input type="number"/></h3></div>
				<div className="col-xs-4"><h3>${itemName.get('theProducts').get('price').toFixed(2)}</h3></div>
			</div>
			)

			
			// console.log(this.state.prices[count]);
			// count=count+1;
			
		})
			
		
		// for (var j=0; j<this.state.items.length-1; j++){
		// 	var k = <div>{this.state.items[0]}</div>
		// }
		return(
			<div className="container-fluid">
				
				{z}
				
			</div>
			)
	
	}
	
});
