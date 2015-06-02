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


/**
export default {
  name: 'error-monitoring',

  initialize: function(container, app) {
    Ember.onerror = function(err) {
      this.logError(err);
    };
    Ember.RSVP.on('error', function(err) {
      this.logError(err);
    });
  }

  logError: function(err) {
    // 1. Vendored Solution
    // Log in trackJs (prod only)
    trackJs.track(err);

    // Log to console (dev only)
    Ember.Logger.assert(false, err);

    // OR

    // 2. Homemade Solution
    Ember.$.ajax('/errors', {
      type: 'POST',
      data: {
        stack: err.stack,
        otherInformation: 'exception message'
      }
    });
  }
}
*/


/**
// Gotcha's
// #1: Most Ember errors are not instances of errors
_convertToError: function(err) {
  if (Ember.typOf(err) === 'object') {
    var msg = err.responseText || err.message || err.toString();
    var status = err.status;
    err = new Error(msg);
    if (status) {
      err.status = status;
    }
  }

  return err;
},
logError: function(err) {
  // Ensure that error is an instance of Error
  err = this._convertToError(err);

  // Log in trackJs and console
  trackJs.track(err);
  Ember.Logger.assert(false, err);
}

// #2: trackJs logs all XHR errors by default
<script>
  window._trackJs = {
    token: 'baguetteandcheese',
    // Whether to send errors to trackJs
    enabled: true,
    network: {
      // Do not log all XHR errors (creates duplicates)
      enabled: false
    }
  };
</script>

// #3: If you disable XHR logging, then you should use promises always
import request from 'ic-ajax';

export default Ember.Controller.extend({
  actions: {
    resetPassword: function() {
      request({
        type: 'POST',
        url: 'users/reset-password',
        data: {
          email: this.get('emailAddress')
        }
      }).then(function() {
        self.transitionToRoute('login');
      }).catch(function(err) {
        err = err.jqXHR || err;
        if (err.status === 404) {
          alertify.error('User not found');
        } else {
          throw err;
        }
      })
    }
  }
});
*/
