var React = require('react');
var _ = require('backbone/node_modules/underscore');
var Backbone = require('backbone');

var ProductModel = require('../models/ProductModel');
var ListModel = require('../models/ListModel');
var UserModel = require('../models/UserModel');
var ListBoxComponent = require('./ListBoxComponent');
var productQuery = new Parse.Query(ProductModel);
var listQuery = new Parse.Query(ListModel);
var EachProductComponent = require('./EachProductComponent');

var jibby=(<div>Loading...</div>);


module.exports = React.createClass({
	getInitialState: function() {
	    return {
	    	lists: null,
	        error: null
	    };
	},
	componentWillMount: function(){
		listQuery.descending('createdAt');
		listQuery.find().then((lists) => {
			console.log(lists);
			this.setState({lists: lists});
		});
	},
	render: function() {
		
		if (this.state.lists!==null){
			// console.log(this.state.lists);
			var jibby = this.state.lists.map((list) => {
				// console.log(list.id);
				var each = <EachProductComponent key={list.id} model={list} />
				return (
					<div className="each">
						<div className="eachList col-xs-12 col-sm-8 col-sm-offset-2 box-shadow--2dp">
							<button onClick={this.expand}>See List</button>
							<h2>{list.get('name')}</h2>
							<h6>{list.get('createdAt').toString().substring(0,10)}</h6>
							<h3>Total: $</h3>
							<section className="toggler" id={list.id}>
								{each}
							</section>
						</div>
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
		else{
			return (<div>Loading...</div>)
		}
		
	},
	expand: function () {
		// console.log(this);
		// console.log(Backbone.history.getFragment().substring(8,18));
		$('.toggler').toggle('slow');
	}
	
});