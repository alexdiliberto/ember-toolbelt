/**
  Ember RSVP Promise wrapper for $.ajax()

  USAGE: App.ajax('/articles/user/' + user_id);
*/
App.ajax = function(url, options) {
  return Ember.RSVP.Promise(function(resolve, reject) {
    var options = options || {};

    options.success = function(data) {
      Ember.run(null, resolve, data);
    };

    options.error = function(jqXHR, status, error) {
      Ember.run(null, reject, arguments);
    };

    $.ajax(url, options);
  });
};