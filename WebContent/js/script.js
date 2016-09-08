var myapp = angular.module("myapp",['ngRoute','mwl.calendar','ngAnimate','ui.bootstrap','ngSocial']);

myapp.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/',{
		templateUrl:"home.html",
		controller:"homecntrl"
	})
	.when('/home',{
		templateUrl:"home.html",
		controller:"homecntrl"
	})
	.when('/profile',{
		templateUrl:"profile.html",
		controller:"profilecntrl"
	})
	.when('/project/Project1',{
		templateUrl:"p1.html",
		controller:"p1cntrl"
	})
	.when('/project/calendar',{
		templateUrl:"calendar.html",
		controller:"KitchenSinkCtrl"
	})
	.when('/project/weather',{
		templateUrl:"weather.html",
		controller:"weathercntrl"
	})
	.when('/project/snake',{
		templateUrl:"snake.html",
		controller:"snakecntrl"
	})
}]);

myapp.controller("homecntrl", function($scope) {
	
});

myapp.controller("profilecntrl", function($scope) {
	
});

myapp.controller("p1cntrl", function($scope) {
	
});

myapp.controller("snakecntrl", function($scope) {
	
});

myapp.controller("KitchenSinkCtrl", function(moment, alert) {
	var vm = this;

    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    vm.events = [
      {
        title: 'An event',
        type: 'warning',
        startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
        endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
        draggable: true,
        resizable: true
      }, {
        title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
        type: 'info',
        startsAt: moment().subtract(1, 'day').toDate(),
        endsAt: moment().add(5, 'days').toDate(),
        draggable: true,
        resizable: true
      }, {
        title: 'This is a really long event title that occurs on every year',
        type: 'important',
        startsAt: moment().startOf('day').add(7, 'hours').toDate(),
        endsAt: moment().startOf('day').add(19, 'hours').toDate(),
        recursOn: 'year',
        draggable: true,
        resizable: true
      }
    ];

    vm.isCellOpen = true;

    vm.eventClicked = function(event) {
      alert.show('Clicked', event);
    };

    vm.eventEdited = function(event) {
      alert.show('Edited', event);
    };

    vm.eventDeleted = function(event) {
      alert.show('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
      alert.show('Dropped or resized', event);
    };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

});

myapp.controller("weathercntrl", function($scope, $http) {
	 
	  $scope.clickcheck=function(){
	    var zip=$scope.aaa;
	    $http.get("http://api.openweathermap.org/data/2.5/weather?zip="+ zip +",us&appid=a30ebb5af6b78e566e1797db9855606e").then(function(response) {
	    $scope.forecast = response.data;
	  })
	  }
	});

myapp.controller('MapCntrl',function(){
	 var link = function(scope, element, attrs) {
	        var map, infoWindow;
	        var markers = [];
	        
	        // map config
	        var mapOptions = {
	            center: new google.maps.LatLng(50, 2),
	            zoom: 4,
	            mapTypeId: google.maps.MapTypeId.ROADMAP,
	            scrollwheel: false
	        };
	        
	        // init the map
	        function initMap() {
	            if (map === void 0) {
	                map = new google.maps.Map(element[0], mapOptions);
	            }
	        }    
	        
	        // place a marker
	        function setMarker(map, position, title, content) {
	            var marker;
	            var markerOptions = {
	                position: position,
	                map: map,
	                title: title,
	                icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
	            };

	            marker = new google.maps.Marker(markerOptions);
	            markers.push(marker); // add marker to array
	            
	            google.maps.event.addListener(marker, 'click', function () {
	                // close window if not undefined
	                if (infoWindow !== void 0) {
	                    infoWindow.close();
	                }
	                // create new window
	                var infoWindowOptions = {
	                    content: content
	                };
	                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
	                infoWindow.open(map, marker);
	            });
	        }
	        
	        // show the map and place some markers
	        initMap();
	        
	        setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
	        setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
	        setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
	    };
	    
	    return {
	        restrict: 'A',
	        template: '<div id="gmaps"></div>',
	        replace: true,
	        link: link
	    };
	
});

myapp.controller('socialCntrl',['$scope',function($scope){
	$scope.current_title = 'www.google.com';
	$scope.current_description = 'This is Google Homepage';
}]);
































