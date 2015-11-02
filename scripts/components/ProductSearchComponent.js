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
		this.props.router.on('route', () => {
			
			this.setState({
				listItems:[]
			});
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
				<div className="bottom-navbar row box-shadow--2dp">
					<div className="storeLogo col-xs-6 box-shadow--2dp">
						<h2>H-E-B Logo</h2>
					</div>
					<div className="col-xs-6 row searches">
						<div className="col-xs-12">
							<p>Add To List:</p>
							{listDropdown}
							<p className="or"> Or </p>
							<a href="#newList"><button className="box-shadow--2dp">Add New</button></a>
						</div>

						<div className="col-xs-12">
							<input className="box-shadow--2dp" placeholder="Search Products:" type="text" />
							<button className="box-shadow--2dp">Go</button>
						</div>
					</div>
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
		
		var list= new ListModel();
		this.setState({
			listItems: this.state.listItems+','+model.id
		}
		,()=>{
			list.set('objectId', this.props.listId);
			list.set('products', this.state.listItems);
			list.save();
		}
		);
	},
	listQuery: function(){
		listQuery.get(this.props.listId).then(
			(list) =>{
				return list.fetch();

			}).then((result)=>{
				console.log(result.id);
				this.setState({currentList: result});
			});
	}
	
});