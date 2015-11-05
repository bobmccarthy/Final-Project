//This is the navigation component. The router has been passed in as a property.
var React = require('react');
var Backbone = require('backbone');
var Bootstrap = require('bootstrap');
var ListModel = require('../models/ListModel');
var listQuery = new Parse.Query(ListModel);
var selectedList;


module.exports = React.createClass({
	getInitialState: function(){
		return{
			selectedList:null
		}
	},
	componentWillMount: function() {
		listQuery.first((list) => {
			this.setState({
				selectedList: list.id
			})
		});
		this.props.router.on('route', () => {
			this.forceUpdate();
		});
		
		
	},
	render: function() {
		// console.log($('#myLists').val());
		// if (!$('#myLists').val()){
		// 	listQuery.first((list) => {
		// 		selectedList=list.id;
		// 	});
		// }
		// else{
		// 	selectedList=$('#myLists').val();
		// }
		
		var navChange = [];
		var currentPage = Backbone.history.getFragment();
		var subUrl = currentPage.substring(0,13);
		if (!Parse.User.current()){
			navChange.push(<a key="a" className="right rightBtn" href="#login">Login</a>);
		}

		else{
			navChange.push(<a key="b" className="right rightBtn" href="#logout" onClick={this.logout}>Logout</a>);
			navChange.push(<a key="c" className={currentPage === 'profile' ? 'active right rightBtn box-shadow--2dp' : 'right rightBtn'} href="#profile">{Parse.User.current().get('username')}`s Profile</a>);
			navChange.push(<a key="f" className={currentPage === 'myLists' ? 'active right rightBtn box-shadow--2dp' : 'right rightBtn'} href="#myLists">My Lists</a>);
			navChange.push(<a key="e" id="proBtn" className={subUrl === 'productSearch' ? 'active right rightBtn box-shadow--2dp' : 'right rightBtn'} href={'#productSearch/'+this.state.selectedList}>Product Picker</a>);
			
			
		}				
		return(
			<div>
				<div id="login">
					<div className="loginWhite">
						<form className="loginForm" onSubmit={this.login}>
							<h2>Username:</h2>
							<input className="box-shadow--4dp" type="text" ref="username"/>
							<h2>Password:</h2>
							<input className="box-shadow--4dp" type="password" ref="password"/>
							<button className="box-shadow--4dp">Go!</button>
						</form>
					</div>
				</div>
				<div className="top-navbar navbar-fixed-top">
					<img src="../../images/scroll4.png"/>
					<a className="navBtn" href="#">G<span className="spam">ist</span></a>
					{navChange}
				</div>
				
			</div>
		)
	},
	login: function(e){
		e.preventDefault();
		// var user = new Parse.User();
		Parse.User.logIn(
			this.refs.username.value,
			this.refs.password.value,
			{
				success: (u) => {
					this.forceUpdate();
					$('#login').hide();
					this.props.router.navigate('#productSearch/'+this.state.selectedList, {trigger: true});

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
