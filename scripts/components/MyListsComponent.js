var React = require('react');
var _ = require('backbone/node_modules/underscore');

var ProductModel = require('../models/ProductModel');
var ListModel = require('../models/ListModel');
var UserModel = require('../models/UserModel');
var ListBoxComponent = require('./ListBoxComponent');
var productQuery = new Parse.Query(ProductModel);
var listQuery = new Parse.Query(ListModel);



module.exports = React.createClass({
	getInitialState: function() {
	    return {
	    	lists: [],
	    	items: '',
	        error: null
	    };
	},
	componentWillMount: function(){
		listQuery.find().then((lists) => {
			// console.log(lists);
			this.setState({lists: lists});
		});
	},
	render: function() {
		// console.log(this.state.lists);
		var jibby = this.state.lists.map((list) => {
			return (
				
				<div className="col-xs-8">
					<ListBoxComponent model={list} id={list.id}/>
				</div>
					
			)
		})
		return(
			<div className="container-fluid">
				<div className="row">
					{jibby}
				</div>
			</div>
			)
		
	}
	
});