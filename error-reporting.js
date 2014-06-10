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

/**
  Also consider more thorough error hanling **(UNTESTED)**
  
  `report_error` is a function that takes an Exception and deals with logging and reporting.
  
  // Trap exceptions from within Ember run loop
  Ember.onerror = report_error;
  
  // Trap unhandled RSVP promise failures
  Ember.RSVP.configure('onerror', report_error);
  
  // Trap unhandled failures during routing
  App.ApplicationRoute = Ember.Route.extend({
      actions: { error: report_error }
  });
  
  // Safety net to report any untrapped exceptions on browsers
  // that respect window.onerror.  Currently, failures from within 
  // Backburner callbacks will end up here. This is inferior to the 
  // other handlers because the stack trace is missing by the 
  // time the exception gets here.
  window.onerror = report_error;
*/
