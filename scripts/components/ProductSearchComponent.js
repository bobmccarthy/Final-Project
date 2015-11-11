var React = require('react');
var $ = require('jquery');
var Backbone = require('backbone');

var ListModel = require('../models/ListModel');
var ProductModel = require('../models/ProductModel');
var productQuery = new Parse.Query(ProductModel);
var listQuery = new Parse.Query(ListModel);
var ListProductsModel = require('../models/ListProductsModel');

var ProductBoxComponent = require('./ProductBoxComponent');
var ListDropdownComponent= require('./ListDropdownComponent');
var dietArray = [];




module.exports = React.createClass({
	getInitialState: function() {
	    return {
	         items: [],
	         produce: [],
	         breads: [],
	         snacks: [],
	         desserts: [],
	         soups: [],
	         international: [],
	         error: null,
	         listItems: [],
	         currentList: []
	    };
	},
	componentWillMount: function() {
		this.props.router.on('route', () => {
			listQuery.equalTo('objectId', Backbone.history.getFragment().substring(14,24));
			listQuery.find().then((list)=> {
				list.map((listz)=>{
					// console.log(listz);
					this.setState({
						listItems: listz
					})
				})
			});
		});
		// var diet = Parse.User.current().get('diet').split(',')[2];
		// console.log(diet);
		dietArray=Parse.User.current().get('dietArray');

		// productQuery.find().then((products) => {
		// 	this.setState({items: products});
		// });
		productQuery.equalTo('category', 'produce');
		productQuery.notContainedIn('ingredients', dietArray);
		productQuery.find().then((products) => {
			this.setState({produce: products});
		});
		productQuery.equalTo('category', 'breads');
		productQuery.notContainedIn('ingredientArray', dietArray);
		productQuery.find().then((products) => {
			this.setState({breads: products});
		});
		productQuery.equalTo('category', 'soups');
		productQuery.find().then((products) => {
			this.setState({soups: products});
		});
		productQuery.equalTo('category', 'snacks');
		productQuery.find().then((products) => {
			this.setState({snacks: products});
		});
		productQuery.equalTo('category', 'desserts');
		productQuery.find().then((products) => {
			this.setState({desserts: products});
		});
		productQuery.equalTo('category', 'international');
		productQuery.find().then((products) => {
			this.setState({international: products});
		});
	},
	
	render: function() {
		// console.log(this.state.listItems);
		var listDropdown = <ListDropdownComponent key="listDropdownThingy" callback={this.listChange} router={this.props.router}/>
		// var allElements = this.state.items.map((product) => {
		// 	return (
		// 		<ProductBoxComponent model={product} callback={this.onItemAdded} />
		// 	)
		// })
		var produceElements = this.state.produce.map((product) => {
			return (
				<ProductBoxComponent key={product.id} model={product} callback={this.onItemAdded} />
			);
		})
		var breadElements = this.state.breads.map((product) => {
			return (
				<ProductBoxComponent key={product.id} model={product} callback={this.onItemAdded} />
			);
		})
		var dessertElements = this.state.desserts.map((product) => {
			return (
				<ProductBoxComponent key={product.id} model={product} callback={this.onItemAdded} />
			);
		})
		var soupElements = this.state.soups.map((product) => {
			return (
				<ProductBoxComponent key={product.id} model={product} callback={this.onItemAdded} />
			);
		})
		var snackElements = this.state.snacks.map((product) => {
			return (
				<ProductBoxComponent key={product.id} model={product} callback={this.onItemAdded} />
			);
		})
		var internationalElements = this.state.international.map((product) => {
			return (
				<ProductBoxComponent key={product.id} model={product} callback={this.onItemAdded} />
			);
		})
		return(
			<div>
				<div className="bottom-navbar row box-shadow--2dp">
					<div className="storeLogo col-xs-12 col-sm-4 box-shadow--2dp">
						<h2>FreshMarketFoods</h2>
					</div>
					<div className="col-xs-12 col-sm-8 row searches">
						<div className="col-xs-6">
							<p>Add Items To List:</p>
							{listDropdown}
							<p className="or"> or </p>
							<a href="#addList"><button className="box-shadow--2dp adList">Create New List</button></a>
						</div>

						<div className="col-xs-6 searchy">
							<input ref="searchBox" onKeyUp={this.color} className="searchBox box-shadow--4dp" placeholder="Search Products:" type="text" />
						
						</div>
					</div>
				</div>
				<div className="container-fluid listContainer">
					<div className="row">
						<h1 className="categoryTitle">Produce:</h1>
						{produceElements}
					</div>
					<div className="row">
						<h1 className="categoryTitle">Breads:</h1>
						{breadElements}
					</div>
					<div className="row">
						<h1 className="categoryTitle">Desserts:</h1>
						{dessertElements}
					</div>
					<div className="row">
						<h1 className="categoryTitle">Soups:</h1>
						{soupElements}
					</div>
					<div className="row">
						<h1 className="categoryTitle">Snacks:</h1>
						{snackElements}
					</div>
					<div className="row">
						<h1 className="categoryTitle">International:</h1>
						{internationalElements}
					</div>
				</div>
				
			</div>
			)
		
	},
	onItemAdded: function(model){
		// $('#button/'+model.id).css('background-color', 'red');
		var list= new ListProductsModel();
		list.set('theList', this.state.listItems);
		list.set('theProducts', model);
		list.save({
			success: function(){
				console.log('saved');
			}
		});
	},
	color: function(){

		if (this.refs.searchBox.value==''){
			$('.listItems').show();
			$('.xtraMargin').css({'width':'25%'})
		}
		else{
			$('.listItems').hide();
			$('.'+this.refs.searchBox.value).show();
			$('.xtraMargin').css({'width': '100%'});
		}
		
		if (this.refs.searchBox.value==='1'){
			console.log('1');
			$('#body').css({'background-color': '#ECECEC'});
		}
		if (this.refs.searchBox.value==='2'){
			console.log('2');
			$('#body').css({'background-color': '#F6F6F6'});
		}
		if (this.refs.searchBox.value==='3'){
			console.log('3');
			$('#body').css({'background-color': '#32EE74'});
		}
	}
	
});