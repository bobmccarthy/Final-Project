var React = require('react');
var $ = require('jquery');

var ListModel = require('../models/ListModel');
var ProductModel = require('../models/ProductModel');
var productQuery = new Parse.Query(ProductModel);
var listQuery = new Parse.Query(ListModel);
var listIt=[];
var ProductBoxComponent = require('./ProductBoxComponent');
var ListDropdownComponent= require('./ListDropdownComponent');

module.exports = React.createClass({
	getInitialState: function() {
	    return {
	         items: [],
	         error: null,
	         listItems: [],
	         currentList: []
	    };
	},
	componentWillMount: function() {
		listQuery.get(this.props.listId).then(
			(list) =>{
				return list.fetch();

			}).then((result)=>{
				// console.log(result);
				this.setState({currentList: result});
			});
		// listQuery.include('products');
		// listQuery.find().then((list)=> {
		// 	// console.log(list);
		// 	this.setState({currentList: list});
		// });
		productQuery.find().then((products) => {
			this.setState({items: products});
		});
	},
	render: function() {
		// var mappy = this.state.currentList.map((products) => {
		// 	console.log(products)
		// 	listIt.push(products);
		// 	console.log(listIt);
		// })
		var listDropdown = <ListDropdownComponent router={this.props.router}/>
		var postElements = this.state.items.map((product) => {
			return (
				<ProductBoxComponent model={product} callback={this.onItemAdded} />
			)
		})
		return(
			<div>
				<div className="bottom-navbar">
					<input type="text" />
					<button>Go</button>
					<p>Current List:</p>
					{listDropdown}
				</div>
				<div className="container-fluid listContainer">
					<div className="row">
						{postElements}
					</div>
				</div>
			</div>
			)
		
	},
	onItemAdded: function(model){
		console.log(model.id);
		console.log(this.props.listId);
		var list= new ListModel();
		this.setState({
			listItems: this.state.listItems+','+model.id
		},()=>{
			list.set('objectId', this.props.listId);
			list.set('products', this.state.listItems);
			list.save();
		})
	}
	
});