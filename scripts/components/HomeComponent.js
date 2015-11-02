//This is the navigation component. The router has been passed in as a property.
var React = require('react');
var Backbone = require('backbone');

module.exports = React.createClass({
	render: function() {
		return(
			<div className="homeImg">
				<img src="http://cdn1.theodysseyonline.com/files/2015/06/15/6356992660350286962015667767_1328830480789_3599975.png"/>
			</div>
		)
	}
});
