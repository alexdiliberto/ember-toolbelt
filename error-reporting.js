/**
  Ember hook to log all errors in production
*/
Ember.onerror = function(error) {
  Ember.$.ajax('/error-notification', 'POST', {
    stack: error.stack,
    otherInformation: 'exception message'
  });
};


/**
  Log all errors that are not immediately handled in promises
*/
Ember.RSVP.on('error', function(error) {
  // optionally, only for errors
  // if (error instanceof Error) { console.assert(false, error); }
  
  console.assert(false, error);
  
  if (error && error.stack) {
    // console.error provides clickable stack-traces in chrome debugger
    console.error(error.stack);
  }
});
