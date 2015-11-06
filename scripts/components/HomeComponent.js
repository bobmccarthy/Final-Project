//This is the navigation component. The router has been passed in as a property.
var React = require('react');
var Backbone = require('backbone');

module.exports = React.createClass({
	render: function() {
		return(
			<div className="homeBkg">
				<div id="carousel-example-generic" className="carousel slide" data-ride="carousel" data-interval="3000">
					<ol className="carousel-indicators">
						<li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
						<li data-target="#carousel-example-generic" data-slide-to="1"></li>
						<li data-target="#carousel-example-generic" data-slide-to="2"></li>
					</ol>

					<div className="carousel-inner">
						<div className="item active">
							<img src="../../images/comp2.jpg" alt="..."/>
							<div className="carousel-caption">
								<h3></h3>
							</div>
						</div>
						<div className="item">
							<img className="adjust" src="../../images/phone.png" alt="..."/>
							<div className="carousel-caption">
								<h3></h3>
							</div>
						</div>
						<div className="item">
							<img src="../../images/prefs3.png" alt="..."/>
							<div className="carousel-caption">
								<h3></h3>
							</div>
						</div>
					</div>

					
					<a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
						<span className="glyphicon glyphicon-chevron-left"></span>
					</a>
					<a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
						<span className="glyphicon glyphicon-chevron-right"></span>
					</a>
				</div> 
				<div className="container-fluid">
					<div className="row">
						<div className="col-xs-12 col-sm-6 description box-shadow--2dp">
							<h2>Biulding the perfect Grocery list, every time.</h2>
							<p>One of the least pleasing parts of grocery shopping is having to come up with a list. Currently, we are lucky enough to know a lot about special diets, allergens, and healthy eating, but there is no easy way to find grocery products that fit your preferences and needs. <strong>Gist</strong> is an easy way to build the perfect grocery list that pertains to your needs.</p>
						</div>
					</div>
				</div>
				<footer>
					<p>Gist, all rights reserved (eventually)</p>
				</footer>
			</div>
		)
	}
});
// <div className="homeImg">
// 					<img src="../../images/comp2.jpg"/>
// 					<img src="../../images/phone.png"/>
// 				</div>
