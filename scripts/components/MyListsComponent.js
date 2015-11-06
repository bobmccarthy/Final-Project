var React = require('react');
var _ = require('backbone/node_modules/underscore');

var ProductModel = require('../models/ProductModel');
var ListModel = require('../models/ListModel');
var UserModel = require('../models/UserModel');
var ListBoxComponent = require('./ListBoxComponent');
var productQuery = new Parse.Query(ProductModel);
var listQuery = new Parse.Query(ListModel);
var array = [];
var jibby=(<div>Loading...</div>);


module.exports = React.createClass({
	getInitialState: function() {
	    return {
	    	lists: [],
	    	items: '',
	        error: null
	    };
	},
	componentWillMount: function(){
		listQuery.descending('createdAt');
		listQuery.find().then((lists) => {
			//post fail here?
			this.setState({lists: lists});
		});
	},
	render: function() {
		var jibby = this.state.lists.map((list) => {
			return (
				<div className="col-xs-12 col-sm-8 col-sm-offset-2">
					<ListBoxComponent key={list.id} model={list} id={list.id}/>
				</div>	
			)
		})
		return(
			<div className="container-fluid">
				<h1>Your Current Grocery Lists:</h1>
				<div className="row">
					{jibby}
				</div>
			</div>
			)
		
	}
	
});