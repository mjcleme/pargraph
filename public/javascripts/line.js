var d3DemoApp = angular.module('example', ['angularCharts']);

d3DemoApp.controller('MainController',
  function MainController($scope, $http) {
    $scope.procs = [1,2,4,8,16,32];
    $scope.data = {
      series: [],
      data: []
    }
    $http.get('/parallel').success(function(data){
      var Point = function (xval) {
        this.x = xval;
        this.y = [];
      }
      // First create the array of points, then we will fill in the times
      for(var nproc = 0; nproc < $scope.procs.length; nproc++) {
        var point = new Point($scope.procs[nproc].toString());
        $scope.data.data.push(point);
      }
      // Now setup the user names and values for each user
      for(var user = 0; user < data.length; user++) {
        $scope.data.series.push(data[user].name);
        for(var nproc = 0; nproc < $scope.procs.length; nproc++) {
          $scope.data.data[nproc].y.push(data[user].data[nproc]);
        }
//        console.log($scope.data);
      }
    });

/*
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
*/


  $scope.chartType = 'line';
  $scope.username = 'YourName';
  $scope.times = [100,50,25,12,6,3];

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

  $scope.delete = function() {
    var delIndex = 0;
    console.log($scope.deletename);
    delIndex = $scope.data.series.indexOf($scope.deletename);
    console.log(delIndex);
    if(delIndex !== -1) {
	$scope.data.series.splice(delIndex, 1);
    } else {
	return;
    }
    for(i = 0; i < 6; i++) {
      if($scope.times[i]) {
        $scope.data.data[i].y.splice(delIndex,1);
      }
    }
    var deluser = {
      name: $scope.deletename
    }
    $http.delete('/parallel', deluser).success(function(data){
      console.log("delete");
      console.log(data);
    });
    console.log(deluser);
  }

  $scope.submit = function() {
    if($scope.username) {
      $scope.data.series.push($scope.username);
    }
//    alert($scope.times);
    for(i = 0; i < 6; i++) {
//      alert($scope.times[i]);
      if($scope.times[i]) {
        $scope.data.data[i].y.push($scope.times[i]);
      } else {
        $scope.data.data[i].y.push(0);
      }
    }
    var newPar = {
      name: $scope.username,
      data: $scope.times
    }
    $http.post('/parallel', newPar).success(function(data){
      console.log("post");
      console.log(data);
    });
    console.log(newPar);
  }
  window.dispatchEvent(new Event('resize'));

});
