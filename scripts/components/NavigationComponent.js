//This is the navigation component. The router has been passed in as a property.
var React = require('react');
var Backbone = require('backbone');
var Bootstrap = require('bootstrap');


module.exports = React.createClass({
	componentWillMount: function() {
		this.props.router.on('route', () => {
			this.forceUpdate();
		});
	},
	render: function() {
		var navChange = [];
		var currentPage = Backbone.history.getFragment();
		var subUrl = currentPage.substring(0,13)
		
		if (!Parse.User.current()){
			navChange.push(<a key="a" className="right rightBtn" href="#login">Login</a>);
		}

		else{
			navChange.push(<a key="b" className="right rightBtn" href="#logout" onClick={this.logout}>logout</a>);
			navChange.push(<a key="c" className={currentPage === 'profile' ? 'active right rightBtn box-shadow--2dp' : 'right rightBtn'} href="#profile">{Parse.User.current().get('username')}`s Profile</a>);
			navChange.push(<a key="f" className={currentPage === 'myLists' ? 'active right rightBtn box-shadow--2dp' : 'right rightBtn'} href="#myLists">My Lists</a>);
			navChange.push(<a key="e" className={subUrl === 'productSearch' ? 'active right rightBtn box-shadow--2dp' : 'right rightBtn'} href="#productSearch">Product Picker</a>);
			
			
		}				
		return(
			<div>
				<div id="login">
					<form className="loginForm" onSubmit={this.login}>
						<h3>Username</h3>
						<input type="text" ref="username"/>
						<h3>Password</h3>
						<input type="password" ref="password"/>
						<button>Go!</button>
					</form>
				</div>
				<div className="top-navbar">
					<a id="navBtn" className={currentPage === '' ? 'active box-shadow--2dp' : ''} href="#">G-List</a>
					{navChange}
				</div>
				
			</div>
		)
	},
	login: function(e){
		e.preventDefault();
		var user = new Parse.User();
		Parse.User.logIn(
			this.refs.username.value,
			this.refs.password.value,
			{
				success: (u) => {
					this.forceUpdate();
					$('#login').hide();
					this.props.router.navigate('productSearch', {trigger: true});

				},
				error: (u, error) => {
					this.setState({
						error: error.message
					});
				}
			}
		);
	},
	logout: function(e){
		console.log('logout');
		e.preventDefault();
		Parse.User.logOut();
		this.props.router.navigate('#logout', {trigger: true})
	}

});
