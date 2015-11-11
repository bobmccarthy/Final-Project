var React = require('react');
var _ = require('backbone/node_modules/underscore');
var Backbone = require('backbone');

var ProductModel = require('../models/ProductModel');
var ListModel = require('../models/ListModel');
var UserModel = require('../models/UserModel');
var TotalPriceComponent = require('./TotalPriceComponent');
var productQuery = new Parse.Query(ProductModel);
var listQuery = new Parse.Query(ListModel);
var EachProductComponent = require('./EachProductComponent');

var jibby=(<div>Loading...</div>);


module.exports = React.createClass({
	getInitialState: function() {
	    return {
	    	lists: null,
	        error: null,
	        reload: false
	    };
	},
	componentWillMount: function(){
		listQuery.descending('createdAt');
		listQuery.find().then((lists) => {
			// console.log(lists);
			this.setState({lists: lists});
		});
	},
	render: function() {
		
		if (this.state.lists!==null){
			// console.log(this.state.lists);
			var jibby = this.state.lists.map((list, index) => {
				var totalPrice = <TotalPriceComponent key={list.id} model={list} />
				var each = <EachProductComponent key={list.id} model={list} />
				return (
					
						<div key={index} className="eachList col-xs-12 col-sm-8 col-sm-offset-2 box-shadow--2dp">
							
								<button onClick={function(){$('#'+list.id).toggle('slow')}}>See List</button>
								<h2>{list.get('name')}</h2>
								<h6>{list.get('createdAt').toString().substring(0,10)}</h6>
								{totalPrice}
								<section className="toggler" id={list.id}>
									{each}
									<button onClick={() => this.destroy(list.id, index)} className="deleteList">Delete List</button>
								</section>
							
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
	destroy: function(id, index){
		console.log(index);
		var toDestroy = this.state.lists.splice(index, 1);
		toDestroy[0].destroy().then(()=>{
			this.setState({lists: this.state.lists});
			$('.toggler').hide();
		});
		
	}
	
	
});