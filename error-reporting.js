/**
  Ember hook to log all errors in production
*/
Ember.onerror = function(error) {
  Ember.$.ajax('/error-notification', 'POST', {
    stack: error.stack,
    otherInformation: 'exception message'
  });
};