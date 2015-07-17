var d3DemoApp = angular.module('example', ['angularCharts']);

d3DemoApp.controller('MainController',
  function MainController($scope) {
	$scope.data = {
		series: ['Mark', 'Joe', 'Mary'],
		data: [
		{
			x: "1",
			y: [800, 1000, 400],
		}, {
			x: "2",
			y: [400, 500, 200],
		}, {
			x: "4",
			y: [200, 250, 100]
		}, {
			x: "8",
			y: [100, 125, 50]
		}, {
			x: "16",
			y: [50, 62, 25]
		}, {
			x: "32",
			y: [25, 31, 12]
		}]
	};


	$scope.chartType = 'line';

	$scope.config = {
		labels: false,
		title: "Performance",
		tooltips: true,
		legend: {
			display: true,
			position: 'left'
		},
		innerRadius: 8,
		lineLegend:"traditional"
	};

});
