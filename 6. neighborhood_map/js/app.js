//Model

//the global variables that will be used
//events will hold the data we obtain from the ajax request
var events = [];
//the url for the meetup api
var url = 'https://api.meetup.com/find/upcoming_events?key=407b1f806f3254335c343e176f714d1f';
//the general location of the user given by the api
var currentLocation = {
  lat: '',
  lon: ''
};
//map and markers and id for the creation of google maps markers
var map;
var markers = [];
var id = 0;






//call the api
$.ajax({
  type: 'GET',
  url: url,
  dataType: 'jsonp',
  data: {
    venue: 'venue'
  }
})

  //if succesfull extract data needed(currentLocation and the data for events)
  .done(function(data) {
    // console.log(data);
    var dataCity = data.data.city;
    var dataEvents = data.data.events;
    var address = '';
    currentLocation.lat = dataCity.lat;
    currentLocation.lon = dataCity.lon;
    //loop to only get the first 7 events
    for (var i = 0; i < 10; i++) {
      var name = dataEvents[i].name;
      var groupName = dataEvents[i].group.name;
      var lat = dataEvents[i].group.lat;
      var lon = dataEvents[i].group.lon;
      var date = new Date(dataEvents[i].local_date);

      if (dataEvents[i].venue && dataEvents[i].venue.address_1) {
        address = dataEvents[i].venue.address_1;
      } else {
        address = 'Does not have address';
      }
      events.push({
        name: name,
        groupName: groupName,
        lat: lat,
        lon: lon,
        date: date,
        address: address,
        id: i
      });
    }
    viewModel.initMap();
    // viewModel.navBar()
    //ko binding need to be done after the ajax request --> to make sure that the data is
    //obtain first
    ko.applyBindings(new viewModel.navBar());
  })
  //if there is an error then do the following
  .fail( function() {
    var errorMessage = 'Data could not be retrieved. Please try again.';
    events.push({
      name: errorMessage,
      groupName: errorMessage,
      lat: errorMessage,
      lon: errorMessage,
      date: errorMessage,
      address: errorMessage,
      id: 0
    });
    ko.applyBindings(new viewModel.navBar());
  });
// });




//creating a class for the markers
var UpcomingMeetLocations = function(data) {
  this.name = ko.observable(data.name);
  this.groupName = ko.observable(data.groupName);
  this.lat = ko.observable(data.lat);
  this.lon = ko.observable(data.lon);
  this.shouldShowMessage = ko.observable(true);
};




//View Model

var viewModel = {

  //function that will take care of creating the initial map
  initMap: function() {

    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: parseFloat(currentLocation.lat),
        lng: parseFloat(currentLocation.lon)
      },
      //I changed the style and the positioning
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_CENTER
      },
      zoom: 12
    });

    var largeInfowindow = new google.maps.InfoWindow();

    for (var i = 0; i < events.length; i++) {
      addMarker(events[i]);
      id += 1;
    }

    function addMarker(event) {
      var name = event.name;
      var lat = parseFloat(event.lat);
      var lon = parseFloat(event.lon);

      var marker = new google.maps.Marker({
        map: map,
        position: {
          lat: lat,
          lng: lon
        },
        title: name,
        animation: google.maps.Animation.DROP,
        id: id,
        show: true
      });

      markers.push(marker);

      //when markers are clickled
      marker.addListener('click', function() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setAnimation(null);
    }
        viewModel.populateInfoWindow(this, largeInfowindow);
        marker.setAnimation(google.maps.Animation.BOUNCE);
      });
    }

  },

  //pupulateInfoWindow which was inspired by the lessons
  populateInfoWindow: function(marker, infowindow) {

    for (var i = 0; i < events.length; i++) {

      if (events[i].id === marker.id) {

        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          var eventname = '<h1>' + 'Event Name: ' + events[i].name + '</h1>';
          var groupname = '<h3>' + 'Group Name: ' + events[i].groupName + '</h3>';
          var address = '<p>' + 'Event is located at ' + '<h4>' + events[i].address + '</h4>' + '</p>';
          var date = '<p>' + 'The date of the event is ' + '<h4>' + events[i].date + '</h4>' + '</p>';
          var content = eventname + groupname + address + date;

          infowindow.setContent('<div>' + content + '</div>');
          infowindow.open(map, marker);

        }

      }
    }


  },

  navBar: function() {
    var self = this;

    this.eventArray = ko.observableArray([]);
    this.userQuery = ko.observable('');
    this.mobileVisible = ko.observable(true);
    this.buttonText = ko.observable('Hide Options');

    this.actionButton = function() {
      if (self.mobileVisible() === true) {
        self.mobileVisible(false);
        self.buttonText('Show Options');
      } else {
        self.mobileVisible(true);
        self.buttonText('Hide Options');
      }
    };


    events.forEach(function(eventItem) {
      self.eventArray.push(new UpcomingMeetLocations(eventItem));
    });

    //function to show the event that was clicked
    this.openMarker = function(event) {
      //for every marker
      for (var i = 0; i < markers.length; i++) {
        //if the event that was clicked name is the same as the title of a marker
        //then it opens up that marker
        if (event.name() == markers[i].title) {
          google.maps.event.trigger(markers[i], 'click');
        }
      }
    };

//called once the user inputs something in the search portion
    this.querySearch = ko.computed(function() {

      var query = self.userQuery().toLowerCase();

      //we want to loop through every item in the eventArray
      for (i = 0; i < self.eventArray().length; i++) {
        //if the item in the eventarray has a name property that contains part of the query
        //then the statement below will return a index else if it can't find it
        //it will return a -1 --> therefore we want it true whenever it is not equal to -1
        if (self.eventArray()[i].name().toLowerCase().indexOf(query) !== -1) {
          //if the query is found then show the text in the navbar
          self.eventArray()[i].shouldShowMessage(true);
          //also go through the markers array and if the eventArray name matches the markers title
          //we want to make the markers visible
          for (var j = 0; j < markers.length; j++) {
            if (self.eventArray()[i].name() == markers[j].title) {
              markers[j].setVisible(true);
            }
          }
          //if the query is not true
        } else {
          //we want to make the markers unvisible and the names unvisible in the navbar
          self.eventArray()[i].shouldShowMessage(false);
          for (var k = 0; k < markers.length; k++) {
            if (self.eventArray()[i].name() == markers[k].title) {
              markers[k].setVisible(false);
            }
          }
        }
      }
    });


  },

//if google maps api does not work
mapError : function() {
    $('.sidebar').toggleClass("invisibleClass");
    $('#map').append("<h1>Map could not be loaded. Please try again later<h1>");
    console.log('hey');
}

};
