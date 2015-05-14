if (Meteor.isClient) {
  Session.setDefault('position', 0);

  Template.hello.helpers({
    place: function () {
      return Session.get('position');
    }
  });

  Template.hello.events({
    'click button': function () {
        Meteor.call('callMe', function(err, result){
            if (err) {
                alert(err);
            } else {
                var r = EJSON.parse(result);
                var location = r.city+", " +r.country_name;
                Session.set('position', location);
                $('.list').append(location+'<br/>');
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
