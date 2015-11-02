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
		var listy = this.state.lists.map(function(list){
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


