'use strict';
var React = require('react');
var bootstrap = require('bootstrap');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
window.$ = require('jquery');
window.jQuery = $;

Parse.initialize('p5pjOUCZjobYEd8rUofEo9IkLessjDxRUsUtvp16', 'Tf3Rd4zjnI98dzkqlcEDVnJ2Pi3vHlumQR8blaHr');

var NavigationComponent = require('./components/NavigationComponent');
var HomeComponent = require('./components/HomeComponent');
var ProductSearchComponent = require('./components/ProductSearchComponent');
var ProfileComponent = require('./components/ProfileComponent');
var MyListsComponent = require('./components/MyListsComponent');
var ItemDetailsComponent = require('./components/ItemDetailsComponent');
var AddListComponent = require('./components/AddListComponent');

$(document).on('ready', function(){
	var Router = Backbone.Router.extend({
		routes: {
			'': 'home',
			'login': 'login',
			'logout': 'home',
			'productSearch(/:id)': 'productSearch',
			'profile': 'profile',
			'myLists': 'myLists',
			'details/:id': 'details',
			'addList': 'addList'
		},
		home: function() {
			$('#login').hide();
			ReactDOM.render(<HomeComponent />,
			document.getElementById('main'));
		},
		login: function(){
			$('#login').toggle('slow');
		},
		productSearch: function(id){
			ReactDOM.render(<ProductSearchComponent router={r} listId={id}/>,
			document.getElementById('main'));
		},
		profile: function(){
			ReactDOM.render(<ProfileComponent router={r} />,
			document.getElementById('main'));
		},
		myLists: function(){
			ReactDOM.render(<MyListsComponent router={r} />,
			document.getElementById('main'));
		},
		details: function(id){
			ReactDOM.render(<ItemDetailsComponent router={r} itemId={id}/>,
			document.getElementById('main'));
		},
		addList: function(){
			ReactDOM.render(<AddListComponent router={r} />,
			document.getElementById('main'));
		}
	});

	var r = new Router();
	Backbone.history.start();

	ReactDOM.render(
		<NavigationComponent router={r} />,
		document.getElementById('nav')
	);
})

