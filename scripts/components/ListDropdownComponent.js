var React = require('react');
var $ = require('jquery');
var ListModel = require('../models/ListModel');
var listQuery = new Parse.Query(ListModel);


module.exports = React.createClass({
	getInitialState: function(){
		return{
			lists: []
			}
		
	},
	componentWillMount: function(){
		listQuery.find().then((lists) => {
			this.setState({lists: lists});
		});
	},
	render: function() {
		var counter=0;
		var listy = this.state.lists.map(function(list){
			if (counter==0){
				<option value={list.id} selected="selected">{list.get('name')}</option>
			}
			return (
				<option value={list.id}>{list.get('name')}</option>
			)
		})
		return (
			<select id="myLists" className="box-shadow--2dp" onChange={this.change}>
				{listy}
			</select>
			)
		
	},
	change: function(){
		this.props.router.navigate('#productSearch/'+$('#myLists').val(), {trigger: true});
	}
	
});


