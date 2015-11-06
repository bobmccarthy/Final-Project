var React = require('react');
var ListModel = require('../models/ListModel');


module.exports = React.createClass({
	render: function() {
		return (
			<div className="container-fluid addList">
			<h1>Create a New Shopping List</h1>
				<form onSubmit={this.submit}>
					<div className="addListCont box-shadow--6dp">
						<h2>New List Name:</h2>
						<input ref="name" type="text" placeholder="type name here"/>
						<button>Add List</button>
					</div>

				</form>
			</div>
		)

	},
	submit: function(e){
		e.preventDefault();
		var list= new ListModel();
		list.set('name', this.refs.name.value);
		list.set('products', '');
		list.save(null,{
  			success: (list) =>{
    			this.props.router.navigate('#productSearch/'+list.id, {trigger: true});
 			},

		});
	}
	
});