/**
  Ember Google Analytics integration
*/
App.Router.reopen({
  didTransition: function(infos) {
    this._super(infos);
    Ember.run.next(function() {
      _gaq.push(['_trackPageView'], window.location.pathname + window.location.hash);
    });
  }
});
