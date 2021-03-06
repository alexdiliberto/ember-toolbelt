/**
  Improve performance by removing event listeners on unused events.
  Great for mobile-heavy applications.
*/
Ember.Application.initializer({
  name: 'delete-event-handlers',

  initialize: function(container, application) {
    var events,
        klass;

    klass = Ember.EventDispatcher;
    events = klass.proto().events;

    delete events.mousemove;
    delete events.mouseleave;
    delete events.mouseenter;
    delete events.touchmove;

    /* ...and others */
  }
});