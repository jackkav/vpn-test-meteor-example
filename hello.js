if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      //Session.set('counter', Session.get('counter') + 1);
      //  var r = Meteor.call('callMe');
      //Session.set('counter', 3);
        Meteor.call('callMe', function(err, result){
            if (err) {
                alert(err);
            } else {
                var r = EJSON.parse(result);
                var location = r.city+", " +r.country_name;
                Session.set('counter', location);
                $('.changeme').append(location+'<br/>');
            }
        });

    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  var getLocationAsync = function (path, cb){
    cb && cb(null, HTTP.get(path).content);
  };
}
Meteor.methods({
  callMe: function()
  {
    var getLocationSync = Meteor.wrapAsync(getLocationAsync)
    return getLocationSync("http://freegeoip.net/json/");
  }
})
