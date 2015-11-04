var React = require('react');
var $ = require ('jquery');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			user: null
		};
	},
	componentWillMount: function() {
		// var q = new Parse.Query(Parse.User);
		// q.get(Parse.User.current().id).then(function(user) {
		// 	console.log(user.get('diet'));
		// });
	},
	render: function() {
		// console.log(Parse.User.current().get('diet'));
		// if(!Parse.User.current()) {
		// 	return <div>loading</div>;
		// }
		return (
			<div className="container-fluid">
				<h1>Personal Info:</h1>
				<div className="row">
					<div className="infoForm col-xs-8 col-xs-offset-2 box-shadow--4dp">
						<form  onSubmit={this.onRegister} className="row">
							<div className="not">User Name</div>
							<input type="text" ref="name" className="validate" id="reg_name" defaultValue={Parse.User.current().get('username')}/>
							<div>Email Address</div>
							<input type="text" ref="email" className="validate" id="email_address" defaultValue={Parse.User.current().get('email')}/>
							<div>Things To Stay Away From:</div>
							<input type="text" ref="diet" defaultValue={Parse.User.current().get('diet')}/>
							<button>Save Changes</button>
						</form>
						<button id="cancelBtn" onClick={this.cancel} className="waves-effect waves-light btn">Cancel</button>
					</div>
				</div>
			</div>
		);
	},
	onRegister: function(e) {
		e.preventDefault();
		
		var user = Parse.User.current();
		user.save({
			username: this.refs.name.value,
			email: this.refs.email.value,
			diet: this.refs.diet.value
		},
		{
			success: (u) => {
				window.localStorage.setItem('Parse/p5pjOUCZjobYEd8rUofEo9IkLessjDxRUsUtvp16/currentUser', JSON.stringify(u.toJSON()))
				this.props.router.navigate('productSearch', {trigger: true});
			}
		});
	},
	cancel: function(){
		this.props.router.navigate('productSearch', {trigger: true});
	}

});